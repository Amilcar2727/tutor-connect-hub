import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, Pencil, Printer, Check, CornerDownLeft, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Estudiante {
  codigo: string;
  nombre: string;
}

interface Tutoria {
  id: string;
  obsAcademico: string;
  obsPersonal: string;
  obsProfesional: string;
  requiereDerivacion: boolean;
  especialidad?: string;
  motivo?: string;
  fechaRegistro: string;
}

interface Cronograma {
  id: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  aula: string;
  estudiante: Estudiante;
  tutoria?: Tutoria;
}

// Mock data basado en las tablas de la BDD
const mockCronogramas: Cronograma[] = [
  {
    id: "1",
    fecha: "12/02/25",
    horaInicio: "10:00",
    horaFin: "10:15",
    aula: "201",
    estudiante: { codigo: "184521", nombre: "Carlo Rodriguez Mamani" },
    tutoria: {
      id: "t1",
      obsAcademico: "El estudiante presenta buen rendimiento en cálculo pero dificultades en programación.",
      obsPersonal: "Se muestra motivado pero con algo de estrés por la carga académica.",
      obsProfesional: "Interesado en desarrollo web, busca orientación para prácticas.",
      requiereDerivacion: false,
      fechaRegistro: "10:03 a.m. - 12/02/2025",
    },
  },
  {
    id: "2",
    fecha: "12/02/25",
    horaInicio: "10:15",
    horaFin: "10:30",
    aula: "201",
    estudiante: { codigo: "184522", nombre: "Ana Quispe Torres" },
    tutoria: {
      id: "t2",
      obsAcademico: "Excelente rendimiento general, destaca en bases de datos.",
      obsPersonal: "Buena adaptación universitaria.",
      obsProfesional: "Orientada hacia análisis de datos.",
      requiereDerivacion: false,
      fechaRegistro: "10:18 a.m. - 12/02/2025",
    },
  },
  {
    id: "3",
    fecha: "12/02/25",
    horaInicio: "10:30",
    horaFin: "10:45",
    aula: "201",
    estudiante: { codigo: "184523", nombre: "José Huamán Ccopa" },
    tutoria: {
      id: "t3",
      obsAcademico: "Presenta dificultades en matemáticas, requiere apoyo adicional.",
      obsPersonal: "Muestra signos de ansiedad ante los exámenes.",
      obsProfesional: "Aún no tiene definida su orientación profesional.",
      requiereDerivacion: true,
      especialidad: "Departamento de Psicología",
      motivo: "Ansiedad académica que afecta su rendimiento en evaluaciones.",
      fechaRegistro: "10:35 a.m. - 12/02/2025",
    },
  },
  {
    id: "4",
    fecha: "12/02/25",
    horaInicio: "10:45",
    horaFin: "11:00",
    aula: "201",
    estudiante: { codigo: "184524", nombre: "Lucía Ramos Quispe" },
    tutoria: {
      id: "t4",
      obsAcademico: "Buen desempeño en programación orientada a objetos.",
      obsPersonal: "Equilibrio entre vida académica y personal.",
      obsProfesional: "Interés en inteligencia artificial.",
      requiereDerivacion: false,
      fechaRegistro: "10:48 a.m. - 12/02/2025",
    },
  },
  {
    id: "5",
    fecha: "12/02/25",
    horaInicio: "11:00",
    horaFin: "11:15",
    aula: "201",
    estudiante: { codigo: "200932", nombre: "Miguel Condori Apaza" },
  },
  {
    id: "6",
    fecha: "12/02/25",
    horaInicio: "11:15",
    horaFin: "11:30",
    aula: "201",
    estudiante: { codigo: "184526", nombre: "Elena Torres Mendoza" },
  },
  {
    id: "7",
    fecha: "12/02/25",
    horaInicio: "11:45",
    horaFin: "12:00",
    aula: "201",
    estudiante: { codigo: "184527", nombre: "Bruno Cáceres Vilca" },
  },
  {
    id: "8",
    fecha: "12/02/25",
    horaInicio: "12:00",
    horaFin: "12:15",
    aula: "201",
    estudiante: { codigo: "184528", nombre: "Sofía Mendoza Chávez" },
  },
];

const TutorPanel = () => {
  const { toast } = useToast();
  const [cronogramas, setCronogramas] = useState<Cronograma[]>(mockCronogramas);
  const [selectedCronograma, setSelectedCronograma] = useState<Cronograma | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Form state
  const [obsAcademico, setObsAcademico] = useState("");
  const [obsPersonal, setObsPersonal] = useState("");
  const [obsProfesional, setObsProfesional] = useState("");
  const [requiereDerivacion, setRequiereDerivacion] = useState(false);
  const [especialidad, setEspecialidad] = useState("Departamento de Psicología");
  const [motivo, setMotivo] = useState("");

  const openRegisterDialog = (cronograma: Cronograma) => {
    setSelectedCronograma(cronograma);
    setIsEditing(false);
    setObsAcademico("");
    setObsPersonal("");
    setObsProfesional("");
    setRequiereDerivacion(false);
    setEspecialidad("Departamento de Psicología");
    setMotivo("");
    setIsDialogOpen(true);
  };

  const openEditDialog = (cronograma: Cronograma) => {
    setSelectedCronograma(cronograma);
    setIsEditing(true);
    if (cronograma.tutoria) {
      setObsAcademico(cronograma.tutoria.obsAcademico);
      setObsPersonal(cronograma.tutoria.obsPersonal);
      setObsProfesional(cronograma.tutoria.obsProfesional);
      setRequiereDerivacion(cronograma.tutoria.requiereDerivacion);
      setEspecialidad(cronograma.tutoria.especialidad || "Departamento de Psicología");
      setMotivo(cronograma.tutoria.motivo || "");
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!selectedCronograma) return;

    const now = new Date();
    const fechaRegistro = `${now.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" })} - ${now.toLocaleDateString("es-PE")}`;

    const newTutoria: Tutoria = {
      id: `t${Date.now()}`,
      obsAcademico,
      obsPersonal,
      obsProfesional,
      requiereDerivacion,
      especialidad: requiereDerivacion ? especialidad : undefined,
      motivo: requiereDerivacion ? motivo : undefined,
      fechaRegistro: isEditing && selectedCronograma.tutoria 
        ? selectedCronograma.tutoria.fechaRegistro 
        : fechaRegistro,
    };

    setCronogramas((prev) =>
      prev.map((c) =>
        c.id === selectedCronograma.id ? { ...c, tutoria: newTutoria } : c
      )
    );

    setIsDialogOpen(false);
    toast({
      title: isEditing ? "Tutoría actualizada" : "Tutoría registrada",
      description: `La tutoría de ${selectedCronograma.estudiante.nombre} ha sido ${isEditing ? "actualizada" : "registrada"} correctamente.`,
    });
  };

  const handleDownload = async (cronograma: Cronograma) => {
    setDownloadingId(cronograma.id);
    
    // Simular descarga
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    toast({
      title: "Constancia generada",
      description: `La constancia de ${cronograma.estudiante.nombre} está lista para descargar.`,
    });
    
    setDownloadingId(null);
  };

  const formatHora = (horaInicio: string, horaFin: string) => {
    return `${horaInicio} - ${horaFin} a.m.`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold text-foreground">Fecha</TableHead>
              <TableHead className="font-semibold text-foreground">Hora</TableHead>
              <TableHead className="font-semibold text-foreground">Aula</TableHead>
              <TableHead className="font-semibold text-foreground">Estudiante</TableHead>
              <TableHead className="font-semibold text-foreground text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cronogramas.map((cronograma, index) => (
              <TableRow 
                key={cronograma.id}
                className={index % 2 === 0 ? "bg-background" : "bg-muted/20"}
              >
                <TableCell className="font-medium">{cronograma.fecha}</TableCell>
                <TableCell>{formatHora(cronograma.horaInicio, cronograma.horaFin)}</TableCell>
                <TableCell>Aula {cronograma.aula}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{cronograma.estudiante.nombre}</p>
                    <p className="text-sm text-muted-foreground">Código: {cronograma.estudiante.codigo}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    {cronograma.tutoria ? (
                      <>
                        <Button
                          size="sm"
                          className="bg-accent hover:bg-accent/90 text-accent-foreground"
                          onClick={() => openEditDialog(cronograma)}
                        >
                          <Pencil className="h-4 w-4 mr-1" />
                          Editar Tutoría
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                          onClick={() => handleDownload(cronograma)}
                          disabled={downloadingId === cronograma.id}
                        >
                          {downloadingId === cronograma.id ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                              Descargando...
                            </>
                          ) : (
                            <>
                              <Printer className="h-4 w-4 mr-1" />
                              Imprimir Constancia
                            </>
                          )}
                        </Button>
                      </>
                    ) : (
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                        onClick={() => openRegisterDialog(cronograma)}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Registrar Tutoría
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal de Registro/Edición */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="bg-muted/50 -mx-6 -mt-6 px-6 py-4 mb-4">
            <DialogTitle className="text-xl font-bold text-primary">
              {isEditing ? "EDITAR TUTORÍA" : "REGISTRAR TUTORÍA"}
            </DialogTitle>
          </DialogHeader>

          {selectedCronograma && (
            <div className="space-y-6">
              {/* Datos del estudiante y sesión */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground text-sm">Nombre Estudiante:</Label>
                  <Input
                    value={selectedCronograma.estudiante.nombre}
                    disabled
                    className="bg-muted/30 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-muted-foreground text-sm">Código Estudiante:</Label>
                  <Input
                    value={selectedCronograma.estudiante.codigo}
                    disabled
                    className="bg-muted/30 mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-muted-foreground text-sm">Fecha:</Label>
                  <Input
                    value={selectedCronograma.fecha}
                    disabled
                    className="bg-muted/30 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-muted-foreground text-sm">Hora:</Label>
                  <Input
                    value={formatHora(selectedCronograma.horaInicio, selectedCronograma.horaFin)}
                    disabled
                    className="bg-muted/30 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-muted-foreground text-sm">Fecha Registro:</Label>
                  <Input
                    value={
                      isEditing && selectedCronograma.tutoria
                        ? selectedCronograma.tutoria.fechaRegistro
                        : new Date().toLocaleString("es-PE")
                    }
                    disabled
                    className="bg-muted/30 mt-1"
                  />
                </div>
              </div>

              {/* Aspectos */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground text-sm">Aspecto Académico:</Label>
                  <Textarea
                    value={obsAcademico}
                    onChange={(e) => setObsAcademico(e.target.value)}
                    placeholder="Observaciones sobre el rendimiento académico..."
                    className="mt-1 min-h-[100px]"
                  />
                </div>
                <div>
                  <Label className="text-muted-foreground text-sm">Aspecto Personal:</Label>
                  <Textarea
                    value={obsPersonal}
                    onChange={(e) => setObsPersonal(e.target.value)}
                    placeholder="Observaciones sobre el aspecto personal..."
                    className="mt-1 min-h-[100px]"
                  />
                </div>
              </div>

              <div>
                <Label className="text-muted-foreground text-sm">Aspecto Profesional:</Label>
                <Textarea
                  value={obsProfesional}
                  onChange={(e) => setObsProfesional(e.target.value)}
                  placeholder="Observaciones sobre la orientación profesional..."
                  className="mt-1 min-h-[80px]"
                />
              </div>

              {/* Derivación */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Label className="text-muted-foreground text-sm">¿Requiere derivación psicológica?</Label>
                  <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground cursor-help" title="Marcar si el estudiante necesita atención psicológica">
                    i
                  </div>
                </div>
                <RadioGroup
                  value={requiereDerivacion ? "si" : "no"}
                  onValueChange={(val) => setRequiereDerivacion(val === "si")}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="si" id="si" />
                    <Label htmlFor="si" className="cursor-pointer">Sí</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no" className="cursor-pointer">No</Label>
                  </div>
                </RadioGroup>

                {requiereDerivacion && (
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <Label className="text-muted-foreground text-sm">Especialidad:</Label>
                      <Input
                        value={especialidad}
                        onChange={(e) => setEspecialidad(e.target.value)}
                        placeholder="Departamento de Psicología"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-sm">Motivo:</Label>
                      <Textarea
                        value={motivo}
                        onChange={(e) => setMotivo(e.target.value)}
                        placeholder="Describa el motivo de la derivación..."
                        className="mt-1 min-h-[60px]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Botones de acción */}
              <div className="flex gap-4 pt-4">
                <Button
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={handleSubmit}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Confirmar
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsDialogOpen(false)}
                >
                  <CornerDownLeft className="h-4 w-4 mr-2" />
                  Volver atrás
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TutorPanel;
