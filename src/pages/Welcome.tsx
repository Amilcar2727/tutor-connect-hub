import { useNavigate } from "react-router-dom";
import { LogIn, BookOpen, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import bgWelcome from "@/assets/bg-welcome.webp";
import logoUnsaac from "@/assets/logo-unsaac.png";
import logoEscuela from "@/assets/logo-escuela.png";

const Welcome = () => {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate("/sistema");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgWelcome})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-secondary/90" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-secondary/20 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logos */}
          <div className="flex items-center justify-center gap-8 mb-10">
            <img
              src={logoEscuela}
              alt="Logo Escuela Profesional"
              className="h-24 md:h-32 object-contain drop-shadow-2xl"
            />
            <div className="h-20 w-px bg-white/30" />
            <img
              src={logoUnsaac}
              alt="Logo UNSAAC"
              className="h-24 md:h-32 object-contain drop-shadow-2xl"
            />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
            Sistema de Tutorías
          </h1>
          <p className="text-xl md:text-2xl text-accent font-semibold mb-2 drop-shadow-md">
            UNSAAC
          </p>
          <p className="text-lg md:text-xl text-white/80 font-medium mb-8">
            Escuela Profesional de Ingeniería de Sistemas
          </p>

          {/* Description */}
          <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Plataforma integral para la gestión, seguimiento y evaluación del programa de tutorías universitarias. 
            Facilitando la comunicación entre tutores, estudiantes y coordinadores académicos.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Shield className="h-10 w-10 text-accent mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Administración</h3>
              <p className="text-white/70 text-sm">
                Gestión de usuarios, asignaciones y cronogramas
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <BookOpen className="h-10 w-10 text-accent mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Tutorías</h3>
              <p className="text-white/70 text-sm">
                Registro y seguimiento de sesiones de tutoría
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Users className="h-10 w-10 text-accent mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Verificación</h3>
              <p className="text-white/70 text-sm">
                Evaluación y reportes del programa de tutorías
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={handleEnter}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-primary font-bold text-lg px-10 py-6 rounded-xl shadow-2xl hover:shadow-accent/30 transition-all duration-300 hover:scale-105"
          >
            <LogIn className="mr-3 h-5 w-5" />
            Iniciar Sesión
          </Button>

          {/* Footer */}
          <p className="mt-12 text-white/50 text-sm">
            Universidad Nacional de San Antonio Abad del Cusco
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
