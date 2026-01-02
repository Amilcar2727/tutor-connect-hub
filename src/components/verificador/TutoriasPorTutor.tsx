import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Download, BookOpen, CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DetalleTutoria {
  codigo: string;
  estudiante: string;
  fecha: string;
  hora: string;
  estado: "realizada" | "pendiente";
}

interface ResumenTutor {
  total: number;
  realizadas: number;
  pendientes: number;
}

const mockDetalle: DetalleTutoria[] = [
  {
    codigo: "184521",
    estudiante: "Carlo Rodriguez Mamani",
    fecha: "12/02/2025",
    hora: "10:00 - 10:15",
    estado: "realizada",
  },
  {
    codigo: "200145",
    estudiante: "Ana Lucía Flores Vilca",
    fecha: "12/02/2025",
    hora: "10:15 - 10:30",
    estado: "realizada",
  },
  {
    codigo: "200932",
    estudiante: "Pedro José Mamani Quispe",
    fecha: "12/02/2025",
    hora: "11:00 - 11:15",
    estado: "pendiente",
  },
  {
    codigo: "195678",
    estudiante: "Rosa María Chávez Apaza",
    fecha: "10/02/2025",
    hora: "09:00 - 09:15",
    estado: "realizada",
  },
  {
    codigo: "201234",
    estudiante: "Luis Fernando Torres Ccapa",
    fecha: "19/02/2025",
    hora: "10:00 - 10:15",
    estado: "pendiente",
  },
  {
    codigo: "198765",
    estudiante: "Carmen Rosa Huamán Quispe",
    fecha: "08/02/2025",
    hora: "11:00 - 11:15",
    estado: "realizada",
  },
];

const tutoresDisponibles = [
  { id: "1", nombre: "Dr. Juan Carlos Pérez Quispe" },
  { id: "2", nombre: "Dra. María Elena Quispe Valdez" },
  { id: "3", nombre: "Mg. Carlos Alberto Ramos Huamán" },
  { id: "4", nombre: "Dr. Roberto Ángel Condori Apaza" },
];

const TutoriasPorTutor = () => {
  const { toast } = useToast();
  const [tutor, setTutor] = useState<string>("");
  const [semestre, setSemestre] = useState<string>("");
  const [detalle, setDetalle] = useState<DetalleTutoria[]>([]);
  const [resumen, setResumen] = useState<ResumenTutor | null>(null);

  const handleConsultar = () => {
    if (!tutor) {
      toast({
        title: "Campo requerido",
        description: "Seleccione un tutor para consultar.",
        variant: "destructive",
      });
      return;
    }

    // Simular consulta
    setDetalle(mockDetalle);
    setResumen({
      total: mockDetalle.length,
      realizadas: mockDetalle.filter((d) => d.estado === "realizada").length,
      pendientes: mockDetalle.filter((d) => d.estado === "pendiente").length,
    });

    toast({
      title: "Consulta realizada",
      description: `Se encontraron ${mockDetalle.length} registros.`,
    });
  };

  const handleExportar = () => {
    toast({
      title: "Exportando datos",
      description: "El archivo se está generando...",
    });
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-foreground">
          Seguimiento por Tutor
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Resumen de tutorías realizadas por tutor
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Panel de filtros */}
        <div className="flex flex-wrap items-end gap-4">
          <div className="space-y-2">
            <Label htmlFor="tutor">Tutor</Label>
            <Select value={tutor} onValueChange={setTutor}>
              <SelectTrigger id="tutor" className="w-[280px]">
                <SelectValue placeholder="Seleccionar tutor" />
              </SelectTrigger>
              <SelectContent>
                {tutoresDisponibles.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="semestre">Semestre</Label>
            <Select value={semestre} onValueChange={setSemestre}>
              <SelectTrigger id="semestre" className="w-[180px]">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025-I">2025-I</SelectItem>
                <SelectItem value="2024-II">2024-II</SelectItem>
                <SelectItem value="2024-I">2024-I</SelectItem>
                <SelectItem value="2023-II">2023-II</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleConsultar} className="gap-2">
            <Search className="h-4 w-4" />
            Consultar
          </Button>
        </div>

        {/* Cards de resumen */}
        {resumen && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-muted/30 border-border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Tutorías</p>
                    <p className="text-3xl font-bold text-foreground">{resumen.total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/30 border-border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-700" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Realizadas</p>
                    <p className="text-3xl font-bold text-green-700">{resumen.realizadas}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/30 border-border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-amber-700" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pendientes</p>
                    <p className="text-3xl font-bold text-amber-700">{resumen.pendientes}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tabla de detalle */}
        {detalle.length > 0 && (
          <>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-foreground">
                Detalle de Tutorías
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
                    <TableHead className="font-semibold">Código</TableHead>
                    <TableHead className="font-semibold">Estudiante</TableHead>
                    <TableHead className="font-semibold">Fecha</TableHead>
                    <TableHead className="font-semibold">Hora</TableHead>
                    <TableHead className="font-semibold">Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {detalle.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.codigo}</TableCell>
                      <TableCell>{item.estudiante}</TableCell>
                      <TableCell>{item.fecha}</TableCell>
                      <TableCell>{item.hora}</TableCell>
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
          </>
        )}

        {/* Estado vacío */}
        {detalle.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Seleccione un tutor y consulte para ver el detalle de tutorías</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TutoriasPorTutor;
