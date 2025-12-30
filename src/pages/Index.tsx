import { useState, useEffect } from "react";
import Header from "@/components/Header";
import UserBar from "@/components/UserBar";
import RolTabs, { RolType } from "@/components/RolTabs";
import SubTabs, { SubTabType, subTabsByRole } from "@/components/SubTabs";
import WelcomePanel from "@/components/WelcomePanel";
import QuickAccessCards from "@/components/QuickAccessCards";

// Datos de ejemplo
const mockUser = {
  nombre: "Juan Carlos Pérez Quispe",
  correo: "jcperez@unsaac.edu.pe",
  codigo: "184567",
  foto: undefined,
};

// Roles asignados al usuario (ejemplo: tiene los 3 roles)
const userRoles: RolType[] = ["administrador", "tutor", "verificador"];

const Index = () => {
  const [activeTab, setActiveTab] = useState<RolType>("inicio");
  const [activeSubTab, setActiveSubTab] = useState<SubTabType | null>(null);

  // Set default sub-tab when role changes
  useEffect(() => {
    const subTabs = subTabsByRole[activeTab];
    if (subTabs && subTabs.length > 0) {
      setActiveSubTab(subTabs[0].id);
    } else {
      setActiveSubTab(null);
    }
  }, [activeTab]);

  const handleTabChange = (tab: RolType) => {
    setActiveTab(tab);
  };

  const handleSubTabChange = (subTab: SubTabType) => {
    setActiveSubTab(subTab);
  };

  const getRolLabel = (tab: RolType): string => {
    switch (tab) {
      case "administrador":
        return "Administrador";
      case "tutor":
        return "Tutor";
      case "verificador":
        return "Verificador";
      default:
        return "Usuario";
    }
  };

  const getSubTabLabel = (): string => {
    const subTabs = subTabsByRole[activeTab];
    if (subTabs && activeSubTab) {
      const found = subTabs.find((st) => st.id === activeSubTab);
      return found ? found.label : "";
    }
    return "";
  };

  const renderSubTabContent = () => {
    if (!activeSubTab) return null;

    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {getSubTabLabel()}
        </h3>
        <p className="text-muted-foreground">
          Contenido por implementar para la sección "{getSubTabLabel()}".
        </p>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "inicio":
        return (
          <div className="space-y-8">
            <WelcomePanel
              user={{
                ...mockUser,
                rol: getRolLabel(activeTab),
              }}
            />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Acceso Rápido
              </h3>
              <QuickAccessCards
                onNavigate={handleTabChange}
                userRoles={userRoles}
              />
            </div>
          </div>
        );

      case "administrador":
        return (
          <div className="space-y-6">
            <WelcomePanel
              user={{
                ...mockUser,
                rol: "Administrador",
              }}
            />
            {renderSubTabContent()}
          </div>
        );

      case "tutor":
        return (
          <div className="space-y-6">
            <WelcomePanel
              user={{
                ...mockUser,
                rol: "Tutor",
              }}
            />
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Panel de Tutorías
              </h3>
              <p className="text-muted-foreground">
                Aquí se mostrarán las opciones de tutoría: Registrar Sesiones, Mis Tutorados, Actividades.
              </p>
            </div>
          </div>
        );

      case "verificador":
        return (
          <div className="space-y-6">
            <WelcomePanel
              user={{
                ...mockUser,
                rol: "Verificador",
              }}
            />
            {renderSubTabContent()}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <UserBar user={mockUser} />
      <RolTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        userRoles={userRoles}
      />
      <SubTabs
        activeRole={activeTab}
        activeSubTab={activeSubTab}
        onSubTabChange={handleSubTabChange}
      />
      
      <main className="container mx-auto px-6 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
