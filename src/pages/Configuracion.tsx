import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Lock, Trash2, Save, Eye, EyeOff, AlertTriangle } from "lucide-react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

// Mock user data
const mockUser = {
  nombre: "Juan Carlos",
  apellido: "Pérez Quispe",
  correo: "jcperez@unsaac.edu.pe",
  codigo: "184567",
};

const Configuracion = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // State for name/surname form
  const [nombre, setNombre] = useState(mockUser.nombre);
  const [apellido, setApellido] = useState(mockUser.apellido);

  // State for password form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State for delete confirmation
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const handleUpdateName = () => {
    if (!nombre.trim() || !apellido.trim()) {
      toast({
        title: "Error",
        description: "El nombre y apellido no pueden estar vacíos",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Información actualizada",
      description: "Tu nombre y apellido han sido actualizados correctamente",
    });
  };

  const handleUpdatePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Error",
        description: "Todos los campos son obligatorios",
        variant: "destructive",
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas nuevas no coinciden",
        variant: "destructive",
      });
      return;
    }
    if (newPassword.length < 8) {
      toast({
        title: "Error",
        description: "La contraseña debe tener al menos 8 caracteres",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Contraseña actualizada",
      description: "Tu contraseña ha sido cambiada correctamente",
    });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmation !== "ELIMINAR") {
      toast({
        title: "Error",
        description: "Debes escribir ELIMINAR para confirmar",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Cuenta eliminada",
      description: "Tu cuenta ha sido eliminada permanentemente",
      variant: "destructive",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Back button and title */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/sistema")}
              className="hover:bg-muted"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Configuración Personal
              </h1>
              <p className="text-sm text-muted-foreground">
                Gestiona tu información personal y seguridad de cuenta
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          
          {/* Card 1: Cambiar Nombre/Apellido */}
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Información Personal</CardTitle>
                  <CardDescription>
                    Actualiza tu nombre y apellido
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre(s)</Label>
                  <Input
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ingresa tu nombre"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apellido">Apellido(s)</Label>
                  <Input
                    id="apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    placeholder="Ingresa tu apellido"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <Button onClick={handleUpdateName} className="gap-2">
                  <Save className="h-4 w-4" />
                  Guardar Cambios
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Actualizar Contraseña */}
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Lock className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <CardTitle className="text-lg">Seguridad</CardTitle>
                  <CardDescription>
                    Actualiza tu contraseña de acceso
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Contraseña Actual</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Ingresa tu contraseña actual"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nueva Contraseña</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Mínimo 8 caracteres"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repite la nueva contraseña"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end pt-2">
                <Button onClick={handleUpdatePassword} variant="secondary" className="gap-2">
                  <Lock className="h-4 w-4" />
                  Actualizar Contraseña
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Eliminar Cuenta */}
          <Card className="border-destructive/50 shadow-sm bg-destructive/5">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-destructive/10">
                  <Trash2 className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <CardTitle className="text-lg text-destructive">Zona de Peligro</CardTitle>
                  <CardDescription>
                    Eliminar tu cuenta permanentemente
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
                <div className="text-sm text-destructive">
                  <p className="font-medium mb-1">Advertencia</p>
                  <p className="text-destructive/80">
                    Esta acción es irreversible. Se eliminarán todos tus datos, 
                    historial de tutorías, y configuraciones asociadas a tu cuenta.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="gap-2">
                      <Trash2 className="h-4 w-4" />
                      Eliminar Cuenta
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center gap-2 text-destructive">
                        <AlertTriangle className="h-5 w-5" />
                        ¿Estás seguro de eliminar tu cuenta?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="space-y-4">
                        <p>
                          Esta acción no se puede deshacer. Se eliminarán permanentemente 
                          todos tus datos del sistema.
                        </p>
                        <div className="space-y-2">
                          <Label htmlFor="deleteConfirm" className="text-foreground">
                            Escribe <span className="font-bold text-destructive">ELIMINAR</span> para confirmar:
                          </Label>
                          <Input
                            id="deleteConfirm"
                            value={deleteConfirmation}
                            onChange={(e) => setDeleteConfirmation(e.target.value)}
                            placeholder="ELIMINAR"
                            className="border-destructive/50 focus-visible:ring-destructive"
                          />
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setDeleteConfirmation("")}>
                        Cancelar
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteAccount}
                        className="bg-destructive hover:bg-destructive/90"
                      >
                        Eliminar Cuenta
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
};

export default Configuracion;
