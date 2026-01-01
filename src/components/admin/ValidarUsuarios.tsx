import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Calendar,
  Clock,
  ShieldCheck,
  Eye,
  CheckCircle2,
  XCircle,
  Send,
  Loader2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PendingUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  roles: string[];
  roles_decisiones: RoleDecision[];
  created_at: string;
}

interface RoleDecision {
  role: string;
  approved: boolean | null;
}

const roleLabels: Record<string, string> = {
  administrador: "Administrador",
  tutor: "Tutor",
  verificador: "Verificador",
};

const roleColors: Record<string, string> = {
  administrador: "bg-secondary text-secondary-foreground",
  tutor: "bg-accent text-accent-foreground",
  verificador: "bg-primary text-primary-foreground",
};

const ValidarUsuarios = () => {
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<PendingUser | null>(null);
  const [roleDecisions, setRoleDecisions] = useState<Record<string, boolean | null>>({});
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const fetchPendingUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("pending_users")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setPendingUsers(data || []);
    } catch (error) {
      console.error("Error fetching pending users:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las solicitudes pendientes.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const openDetails = (user: PendingUser) => {
    setSelectedUser(user);
    // Initialize role decisions from existing decisions or set to null
    const decisions: Record<string, boolean | null> = {};
    user.roles.forEach((role) => {
      const existingDecision = user.roles_decisiones?.find((d) => d.role === role);
      decisions[role] = existingDecision?.approved ?? null;
    });
    setRoleDecisions(decisions);
  };

  const closeDetails = () => {
    setSelectedUser(null);
    setRoleDecisions({});
  };

  const handleRoleDecision = (role: string, approved: boolean) => {
    setRoleDecisions((prev) => ({
      ...prev,
      [role]: prev[role] === approved ? null : approved,
    }));
  };

  const handleSubmitDecisions = async () => {
    if (!selectedUser) return;

    // Check if all roles have a decision
    const allDecided = selectedUser.roles.every(
      (role) => roleDecisions[role] !== null
    );

    if (!allDecided) {
      toast({
        title: "Decisiones incompletas",
        description: "Debes aprobar o rechazar cada rol antes de enviar.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      const newDecisions = selectedUser.roles.map((role) => ({
        role,
        approved: roleDecisions[role],
      }));

      const { error } = await supabase
        .from("pending_users")
        .update({ roles_decisiones: newDecisions })
        .eq("id", selectedUser.id);

      if (error) throw error;

      toast({
        title: "Decisiones enviadas",
        description: "Las decisiones de roles han sido registradas correctamente.",
      });

      // Refresh list
      fetchPendingUsers();
      closeDetails();
    } catch (error) {
      console.error("Error submitting decisions:", error);
      toast({
        title: "Error",
        description: "No se pudieron enviar las decisiones.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-PE", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("es-PE", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Cargando solicitudes...</span>
      </div>
    );
  }

  if (pendingUsers.length === 0) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="py-12 text-center">
          <ShieldCheck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Sin solicitudes pendientes
          </h3>
          <p className="text-muted-foreground">
            No hay nuevas solicitudes de acceso por revisar.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Solicitudes de Acceso
          </h3>
          <p className="text-sm text-muted-foreground">
            {pendingUsers.length} solicitud{pendingUsers.length !== 1 ? "es" : ""} pendiente{pendingUsers.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Grid de tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pendingUsers.map((user) => (
          <Card
            key={user.id}
            className="bg-card border-border hover:shadow-lg transition-shadow duration-200 overflow-hidden"
          >
            {/* Barra superior decorativa */}
            <div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
            
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm leading-tight">
                      {user.first_name} {user.last_name}
                    </h4>
                    <div className="flex items-center gap-1 mt-1">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground truncate max-w-[150px]">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0 space-y-4">
              {/* Fecha y hora */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{formatDate(user.created_at)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{formatTime(user.created_at)}</span>
                </div>
              </div>

              {/* Roles solicitados */}
              <div className="space-y-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Roles Solicitados
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {user.roles.map((role) => (
                    <Badge
                      key={role}
                      variant="secondary"
                      className={`text-xs ${roleColors[role] || "bg-muted text-muted-foreground"}`}
                    >
                      {roleLabels[role] || role}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Botón ver detalle */}
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-2"
                onClick={() => openDetails(user)}
              >
                <Eye className="h-4 w-4 mr-2" />
                Ver Detalle
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de detalles */}
      <Dialog open={!!selectedUser} onOpenChange={(open) => !open && closeDetails()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Revisar Solicitud
            </DialogTitle>
            <DialogDescription>
              Revisa los detalles y decide sobre cada rol solicitado.
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-6 pr-4">
                {/* Información del solicitante */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                    Información Personal
                  </h4>
                  <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {selectedUser.first_name} {selectedUser.last_name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {selectedUser.email}
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Fecha:</span>
                        <p className="font-medium">{formatDate(selectedUser.created_at)}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Hora:</span>
                        <p className="font-medium">{formatTime(selectedUser.created_at)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decisión de roles */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                    Decisión por Rol
                  </h4>
                  <div className="space-y-3">
                    {selectedUser.roles.map((role) => (
                      <div
                        key={role}
                        className="bg-card border border-border rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <Badge
                            variant="secondary"
                            className={`${roleColors[role] || "bg-muted text-muted-foreground"}`}
                          >
                            {roleLabels[role] || role}
                          </Badge>
                          {roleDecisions[role] !== null && (
                            <span
                              className={`text-xs font-medium ${
                                roleDecisions[role]
                                  ? "text-green-600"
                                  : "text-destructive"
                              }`}
                            >
                              {roleDecisions[role] ? "Aprobado" : "Rechazado"}
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant={roleDecisions[role] === true ? "default" : "outline"}
                            className={`flex-1 ${
                              roleDecisions[role] === true
                                ? "bg-green-600 hover:bg-green-700 text-white"
                                : ""
                            }`}
                            onClick={() => handleRoleDecision(role, true)}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Aprobar
                          </Button>
                          <Button
                            size="sm"
                            variant={roleDecisions[role] === false ? "destructive" : "outline"}
                            className="flex-1"
                            onClick={() => handleRoleDecision(role, false)}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Rechazar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          )}

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={closeDetails}>
              Cancelar
            </Button>
            <Button
              onClick={handleSubmitDecisions}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Decisiones
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ValidarUsuarios;
