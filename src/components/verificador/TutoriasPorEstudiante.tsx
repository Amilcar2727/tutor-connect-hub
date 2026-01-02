import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Download, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Estudiante {
  codigo: string;
  nombre: string;
  semestre: string;
  tutorAsignado: string;
  estadoGeneral: "regular" | "observado";
}

interface HistorialTutoria {
  fecha: string;
  hora: string;
  tutor: string;
  tipo: string;
  estado: "realizada" | "pendiente";
}

const mockEstudiante: Estudiante = {
  codigo: "184521",
  nombre: "Carlo Rodriguez Mamani",
  semestre: "VIII",
  tutorAsignado: "Dr. Juan Carlos Pérez Quispe",
  estadoGeneral: "regular",
};

const mockHistorial: HistorialTutoria[] = [
  {
    fecha: "12/02/2025",
    hora: "10:00 - 10:15",
    tutor: "Dr. Juan Carlos Pérez Quispe",
    tipo: "Asignada",
    estado: "realizada",
  },
  {
    fecha: "05/02/2025",
    hora: "11:00 - 11:15",
    tutor: "Dr. Juan Carlos Pérez Quispe",
    tipo: "Asignada",
    estado: "realizada",
  },
  {
    fecha: "29/01/2025",
    hora: "10:00 - 10:15",
    tutor: "Dr. Juan Carlos Pérez Quispe",
    tipo: "Asignada",
    estado: "realizada",
  },
  {
    fecha: "22/01/2025",
    hora: "09:00 - 09:15",
    tutor: "Dr. Juan Carlos Pérez Quispe",
    tipo: "Libre",
    estado: "realizada",
  },
  {
    fecha: "19/02/2025",
    hora: "10:00 - 10:15",
    tutor: "Dr. Juan Carlos Pérez Quispe",
    tipo: "Asignada",
    estado: "pendiente",
  },
];

const TutoriasPorEstudiante = () => {
  const { toast } = useToast();
  const [busqueda, setBusqueda] = useState("");
  const [estudiante, setEstudiante] = useState<Estudiante | null>(null);
  const [historial, setHistorial] = useState<HistorialTutoria[]>([]);

  const handleBuscar = () => {
    if (!busqueda.trim()) {
      toast({
        title: "Campo requerido",
        description: "Ingrese un código o nombre para buscar.",
        variant: "destructive",
      });
      return;
    }

    // Simular búsqueda
    setEstudiante(mockEstudiante);
    setHistorial(mockHistorial);

    toast({
      title: "Estudiante encontrado",
      description: `Se cargó la información de ${mockEstudiante.nombre}`,
    });
  };

  const handleExportar = () => {
    toast({
      title: "Exportando historial",
      description: "El archivo se está generando...",
    });
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-foreground">
          Seguimiento por Estudiante
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Historial de tutorías por estudiante
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Barra de búsqueda */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="busqueda">Buscar estudiante</Label>
            <div className="flex gap-2">
              <Input
                id="busqueda"
                placeholder="Código o nombre del estudiante..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleBuscar()}
                className="flex-1"
              />
              <Button onClick={handleBuscar} className="gap-2">
                <Search className="h-4 w-4" />
                Buscar
              </Button>
            </div>
          </div>
        </div>

        {/* Card de información del estudiante */}
        {estudiante && (
          <Card className="bg-muted/30 border-border">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Nombre completo</p>
                    <p className="font-medium text-foreground">{estudiante.nombre}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Código</p>
                    <p className="font-medium text-foreground">{estudiante.codigo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Semestre</p>
                    <p className="font-medium text-foreground">{estudiante.semestre}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tutor asignado</p>
                    <p className="font-medium text-foreground">{estudiante.tutorAsignado}</p>
                  </div>
                </div>
                <Badge
                  className={
                    estudiante.estadoGeneral === "regular"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                  }
                >
                  {estudiante.estadoGeneral === "regular" ? "Regular" : "Observado"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tabla de historial */}
        {historial.length > 0 && (
          <>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-foreground">
                Historial de Tutorías
              </h3>
              <Button variant="outline" onClick={handleExportar} className="gap-2">
                <Download className="h-4 w-4" />
                Exportar
              </Button>
            </div>

            <div className="rounded-md border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Fecha</TableHead>
                    <TableHead className="font-semibold">Hora</TableHead>
                    <TableHead className="font-semibold">Tutor</TableHead>
                    <TableHead className="font-semibold">Tipo</TableHead>
                    <TableHead className="font-semibold">Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {historial.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.fecha}</TableCell>
                      <TableCell>{item.hora}</TableCell>
                      <TableCell>{item.tutor}</TableCell>
                      <TableCell>{item.tipo}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            item.estado === "realizada"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                          }
                        >
                          {item.estado === "realizada" ? "Realizada" : "Pendiente"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Resumen */}
            <div className="text-sm text-muted-foreground">
              Total: {historial.length} tutorías | 
              Realizadas: {historial.filter(h => h.estado === "realizada").length} | 
              Pendientes: {historial.filter(h => h.estado === "pendiente").length}
            </div>
          </>
        )}

        {/* Estado vacío */}
        {!estudiante && (
          <div className="text-center py-12 text-muted-foreground">
            <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Ingrese un código o nombre para buscar el historial del estudiante</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TutoriasPorEstudiante;
