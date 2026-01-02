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
import { Search, Download, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SesionTutoria {
  codigo: string;
  nombreEstudiante: string;
  fechaAtencion: string | null;
  tutorResponsable: string;
  estado: "atendido" | "pendiente";
}

const mockSesiones: SesionTutoria[] = [
  {
    codigo: "184521",
    nombreEstudiante: "Carlo Rodriguez Mamani",
    fechaAtencion: "12/02/2025",
    tutorResponsable: "Dr. Juan Carlos Pérez Quispe",
    estado: "atendido",
  },
  {
    codigo: "184525",
    nombreEstudiante: "Miguel Ángel Condori Huanca",
    fechaAtencion: null,
    tutorResponsable: "Dra. María Elena Quispe Valdez",
    estado: "pendiente",
  },
  {
    codigo: "200145",
    nombreEstudiante: "Ana Lucía Flores Vilca",
    fechaAtencion: "10/02/2025",
    tutorResponsable: "Dr. Juan Carlos Pérez Quispe",
    estado: "atendido",
  },
  {
    codigo: "200932",
    nombreEstudiante: "Pedro José Mamani Quispe",
    fechaAtencion: null,
    tutorResponsable: "Mg. Carlos Alberto Ramos Huamán",
    estado: "pendiente",
  },
  {
    codigo: "195678",
    nombreEstudiante: "Rosa María Chávez Apaza",
    fechaAtencion: "08/02/2025",
    tutorResponsable: "Dra. María Elena Quispe Valdez",
    estado: "atendido",
  },
  {
    codigo: "201234",
    nombreEstudiante: "Luis Fernando Torres Ccapa",
    fechaAtencion: null,
    tutorResponsable: "Dr. Juan Carlos Pérez Quispe",
    estado: "pendiente",
  },
];

const TutoriasPorSemestre = () => {
  const { toast } = useToast();
  const [semestre, setSemestre] = useState<string>("");
  const [estado, setEstado] = useState<string>("");
  const [sesiones, setSesiones] = useState<SesionTutoria[]>(mockSesiones);

  const handleBuscar = () => {
    let filtered = mockSesiones;

    if (estado && estado !== "todos") {
      filtered = filtered.filter((s) => s.estado === estado);
    }

    setSesiones(filtered);

    toast({
      title: "Búsqueda realizada",
      description: `Se encontraron ${filtered.length} registros.`,
    });
  };

  const handleExportar = () => {
    toast({
      title: "Exportando datos",
      description: "El archivo se está generando...",
    });
  };

  const handleImprimir = () => {
    toast({
      title: "Preparando impresión",
      description: "Se abrirá el diálogo de impresión...",
    });
    window.print();
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-foreground">
          Revisión de Sesiones de Tutoría
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Control de estudiantes atendidos y pendientes por semestre
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Filtros y acciones */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          {/* Panel de filtros */}
          <div className="flex flex-wrap items-end gap-4">
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

            <div className="space-y-2">
              <Label htmlFor="estado">Estado</Label>
              <Select value={estado} onValueChange={setEstado}>
                <SelectTrigger id="estado" className="w-[180px]">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="atendido">Atendido</SelectItem>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleBuscar} className="gap-2">
              <Search className="h-4 w-4" />
              Buscar
            </Button>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportar} className="gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
            <Button variant="outline" onClick={handleImprimir} className="gap-2">
              <Printer className="h-4 w-4" />
              Imprimir
            </Button>
          </div>
        </div>

        {/* Tabla de datos */}
        <div className="rounded-md border border-border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Código</TableHead>
                <TableHead className="font-semibold">Nombre del Estudiante</TableHead>
                <TableHead className="font-semibold">Fecha de Atención</TableHead>
                <TableHead className="font-semibold">Tutor Responsable</TableHead>
                <TableHead className="font-semibold">Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sesiones.map((sesion) => (
                <TableRow key={sesion.codigo}>
                  <TableCell className="font-medium">{sesion.codigo}</TableCell>
                  <TableCell>{sesion.nombreEstudiante}</TableCell>
                  <TableCell>{sesion.fechaAtencion || "-"}</TableCell>
                  <TableCell>{sesion.tutorResponsable}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        sesion.estado === "atendido"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                      }
                    >
                      {sesion.estado === "atendido" ? "Atendido" : "Pendiente"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {sesiones.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    No se encontraron registros
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Resumen */}
        <div className="text-sm text-muted-foreground">
          Total: {sesiones.length} registros | 
          Atendidos: {sesiones.filter(s => s.estado === "atendido").length} | 
          Pendientes: {sesiones.filter(s => s.estado === "pendiente").length}
        </div>
      </CardContent>
    </Card>
  );
};

export default TutoriasPorSemestre;
