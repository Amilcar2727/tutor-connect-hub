import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Download, Upload, Shield, Clock, FileArchive, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for backup history
const mockBackupHistory = [
  {
    id: 1,
    fecha: "05/01/2026",
    hora: "14:30",
    archivo: "backup_2026-01-05_143000.zip",
    tamaño: "2.4 MB",
    estado: "completado",
    usuario: "Admin Sistema",
  },
  {
    id: 2,
    fecha: "01/01/2026",
    hora: "10:00",
    archivo: "backup_2026-01-01_100000.zip",
    tamaño: "2.1 MB",
    estado: "completado",
    usuario: "Admin Sistema",
  },
  {
    id: 3,
    fecha: "28/12/2025",
    hora: "18:45",
    archivo: "backup_2025-12-28_184500.zip",
    tamaño: "1.9 MB",
    estado: "completado",
    usuario: "Admin Sistema",
  },
  {
    id: 4,
    fecha: "20/12/2025",
    hora: "09:15",
    archivo: "backup_2025-12-20_091500.zip",
    tamaño: "1.8 MB",
    estado: "completado",
    usuario: "Admin Sistema",
  },
];

const Seguridad = () => {
  const { toast } = useToast();
  const [isBackupLoading, setIsBackupLoading] = useState(false);
  const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleBackup = () => {
    setIsBackupLoading(true);
    
    // Simulate backup process
    setTimeout(() => {
      setIsBackupLoading(false);
      toast({
        title: "Backup generado exitosamente",
        description: "El archivo backup_2026-01-06_120000.zip está listo para descargar.",
      });
      
      // Simulate download
      const link = document.createElement("a");
      link.href = "#";
      link.download = "backup_2026-01-06_120000.zip";
      // In real implementation, this would trigger actual download
    }, 2000);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.name.endsWith(".zip")) {
        setSelectedFile(file);
      } else {
        toast({
          title: "Archivo inválido",
          description: "Solo se permiten archivos ZIP.",
          variant: "destructive",
        });
      }
    }
  };

  const handleRestore = () => {
    if (!selectedFile) return;
    
    toast({
      title: "Restauración iniciada",
      description: `Restaurando desde ${selectedFile.name}...`,
    });
    
    // Simulate restore process
    setTimeout(() => {
      toast({
        title: "Restauración completada",
        description: "La base de datos ha sido restaurada exitosamente.",
      });
      setIsRestoreDialogOpen(false);
      setSelectedFile(null);
    }, 3000);
  };

  const handleDownloadBackup = (archivo: string) => {
    toast({
      title: "Descargando backup",
      description: `Iniciando descarga de ${archivo}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          Seguridad del Sistema
        </h2>
        <p className="text-muted-foreground mt-1">
          Gestión de copias de seguridad y restauración de datos
        </p>
      </div>

      {/* Action Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Backup Card */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Download className="h-5 w-5 text-primary" />
              Generar Backup
            </CardTitle>
            <CardDescription>
              Crear una copia de seguridad completa del sistema en formato ZIP
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <FileArchive className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Formato:</span>
                <span className="font-medium">.zip</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Último backup:</span>
                <span className="font-medium">05/01/2026 - 14:30</span>
              </div>
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleBackup}
              disabled={isBackupLoading}
            >
              {isBackupLoading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Generando backup...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Generar y Descargar Backup
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Restore Card */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Upload className="h-5 w-5 text-amber-600" />
              Restaurar Sistema
            </CardTitle>
            <CardDescription>
              Restaurar el sistema desde un archivo de backup ZIP
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-amber-800 dark:text-amber-200">
                    Advertencia
                  </p>
                  <p className="text-amber-700 dark:text-amber-300">
                    La restauración reemplazará todos los datos actuales del sistema.
                  </p>
                </div>
              </div>
            </div>
            
            <Dialog open={isRestoreDialogOpen} onOpenChange={setIsRestoreDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-400 dark:hover:bg-amber-950/30">
                  <Upload className="h-4 w-4 mr-2" />
                  Subir Archivo de Backup
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Restaurar desde Backup</DialogTitle>
                  <DialogDescription>
                    Seleccione un archivo ZIP de backup para restaurar el sistema.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="backup-file">Archivo de Backup (.zip)</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                      <input
                        id="backup-file"
                        type="file"
                        accept=".zip"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      <label 
                        htmlFor="backup-file" 
                        className="cursor-pointer space-y-2"
                      >
                        <FileArchive className="h-10 w-10 mx-auto text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          {selectedFile ? (
                            <span className="text-primary font-medium">{selectedFile.name}</span>
                          ) : (
                            "Haz clic para seleccionar un archivo ZIP"
                          )}
                        </p>
                      </label>
                    </div>
                  </div>
                  
                  {selectedFile && (
                    <div className="bg-muted/50 rounded-lg p-3 flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <div className="text-sm">
                        <p className="font-medium">{selectedFile.name}</p>
                        <p className="text-muted-foreground">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                <DialogFooter>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsRestoreDialogOpen(false);
                      setSelectedFile(null);
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    onClick={handleRestore}
                    disabled={!selectedFile}
                    className="bg-amber-600 hover:bg-amber-700"
                  >
                    Restaurar Sistema
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

      {/* Backup History */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="h-5 w-5 text-primary" />
            Historial de Backups
          </CardTitle>
          <CardDescription>
            Registro de copias de seguridad generadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Fecha</TableHead>
                  <TableHead>Hora</TableHead>
                  <TableHead>Archivo</TableHead>
                  <TableHead>Tamaño</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Usuario</TableHead>
                  <TableHead className="text-right">Acción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockBackupHistory.map((backup) => (
                  <TableRow key={backup.id}>
                    <TableCell className="font-medium">{backup.fecha}</TableCell>
                    <TableCell>{backup.hora}</TableCell>
                    <TableCell>
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {backup.archivo}
                      </code>
                    </TableCell>
                    <TableCell>{backup.tamaño}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        {backup.estado}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {backup.usuario}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDownloadBackup(backup.archivo)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Seguridad;
