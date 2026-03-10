import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowRight, User, Phone, ShieldCheck, ArrowLeft } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import nexviaLogo from "@/assets/nexvia-logo.png";
import loginBg from "@/assets/login-bg.jpg";

type View = "login" | "register" | "otp";

const LoginPage = () => {
  const [view, setView] = useState<View>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""]);
  const [otpMethod, setOtpMethod] = useState<"email" | "phone">("email");
  const [resendTimer, setResendTimer] = useState(0);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedTermsLogin, setAcceptedTermsLogin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTermsLogin) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setView("otp");
      startResendTimer();
    }, 1000);
  };

  const startResendTimer = () => {
    setResendTimer(60);
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otpCode[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.join("").length < 6) return;
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); navigate("/dashboard"); }, 1000);
  };

  const handleResendOtp = () => {
    if (resendTimer > 0) return;
    startResendTimer();
  };

  const maskedContact = otpMethod === "email"
    ? email.replace(/(.{2})(.*)(@.*)/, "$1***$3")
    : phone.replace(/(\d{3})\d+(\d{2})/, "$1****$2");

  const inputClass =
    "w-full h-12 pl-11 pr-4 rounded-lg border border-input bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary transition-all";

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src={loginBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-accent/80" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-primary-foreground">
          <div />
          <div className="animate-fade-in">
            <h1 className="font-display text-4xl font-bold leading-tight mb-4">
              {view === "otp"
                ? "Verificación\nde seguridad"
                : view === "register"
                ? "Únete a\nNEXVIA"
                : "Conectamos tu negocio\ncon el mundo"}
            </h1>
            <p className="text-lg opacity-90 max-w-md">
              {view === "otp"
                ? "Estamos confirmando tu identidad para proteger tu cuenta. Solo toma unos segundos."
                : view === "register"
                ? "Crea tu cuenta y comienza a gestionar tus comunicaciones SMS, WhatsApp, Email y Voz empresarial."
                : "Plataforma de mensajería SMS empresarial. Envía, recibe y gestiona tus comunicaciones de forma segura y eficiente."}
            </p>
          </div>
          <p className="text-sm opacity-60">© {new Date().getFullYear()} NEXVIA — Gateway SMS</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-md animate-fade-in">
          <div className="flex justify-center mb-10">
            <img src={nexviaLogo} alt="NEXVIA" className="h-12 object-contain" />
          </div>

          {/* ── OTP VIEW ── */}
          {view === "otp" && (
            <>
              <button onClick={() => setView("register")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
                <ArrowLeft className="h-4 w-4" /> Volver al registro
              </button>
              <div className="text-center mb-8">
                <div className="mx-auto mb-4 h-16 w-16 rounded-2xl flex items-center justify-center" style={{ background: "var(--nexvia-gradient)" }}>
                  <ShieldCheck className="h-8 w-8 text-primary-foreground" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">Verifica tu cuenta</h2>
                <p className="text-muted-foreground text-sm">
                  Enviamos un código de 6 dígitos a <span className="font-semibold text-foreground">{maskedContact}</span>
                </p>
              </div>
              <div className="flex gap-2 mb-6 p-1 rounded-lg bg-muted">
                <button type="button" onClick={() => setOtpMethod("email")} className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${otpMethod === "email" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                  <Mail className="h-3.5 w-3.5 inline mr-1.5" />Correo
                </button>
                <button type="button" onClick={() => setOtpMethod("phone")} className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${otpMethod === "phone" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                  <Phone className="h-3.5 w-3.5 inline mr-1.5" />Teléfono
                </button>
              </div>
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div className="flex justify-center gap-2.5">
                  {otpCode.map((digit, i) => (
                    <input key={i} id={`otp-${i}`} type="text" inputMode="numeric" maxLength={1} value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value.replace(/\D/, ""))}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className="w-12 h-14 text-center text-xl font-bold rounded-lg border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary transition-all"
                    />
                  ))}
                </div>
                <button type="submit" disabled={isLoading || otpCode.join("").length < 6}
                  className="w-full h-12 rounded-lg font-semibold text-primary-foreground transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60"
                  style={{ background: "var(--nexvia-gradient)", boxShadow: "var(--nexvia-shadow)" }}>
                  {isLoading ? <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> : (<>Verificar cuenta <ShieldCheck className="h-4 w-4" /></>)}
                </button>
              </form>
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  ¿No recibiste el código?{" "}
                  <button onClick={handleResendOtp} disabled={resendTimer > 0} className="font-semibold text-primary hover:text-primary/80 transition-colors disabled:text-muted-foreground disabled:cursor-not-allowed">
                    {resendTimer > 0 ? `Reenviar en ${resendTimer}s` : "Reenviar código"}
                  </button>
                </p>
              </div>
            </>
          )}

          {/* ── LOGIN / REGISTER VIEWS ── */}
          {view !== "otp" && (
            <>
              <div className="flex mb-8 p-1 rounded-lg bg-muted">
                <button onClick={() => setView("login")} className={`flex-1 py-2.5 rounded-md text-sm font-semibold transition-all ${view === "login" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                  Iniciar sesión
                </button>
                <button onClick={() => setView("register")} className={`flex-1 py-2.5 rounded-md text-sm font-semibold transition-all ${view === "register" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                  Crear cuenta
                </button>
              </div>

              {/* ── LOGIN FORM ── */}
              {view === "login" && (
                <>
                  <div className="text-center mb-8">
                    <h2 className="font-display text-2xl font-bold text-foreground mb-2">Bienvenido de vuelta</h2>
                    <p className="text-muted-foreground">Ingresa tus credenciales para acceder a tu cuenta</p>
                  </div>
                  <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground" htmlFor="login-email">Correo electrónico</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input id="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@empresa.com" className={inputClass} required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-foreground" htmlFor="login-password">Contraseña</label>
                        <button type="button" className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">¿Olvidaste tu contraseña?</button>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input id="login-password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full h-12 pl-11 pr-12 rounded-lg border border-input bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary transition-all" required />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Keep me signed in + Reset password */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox id="keep-signed-in" className="h-4 w-4" />
                        <label htmlFor="keep-signed-in" className="text-sm text-muted-foreground cursor-pointer">Mantener sesión</label>
                      </div>
                      <button type="button" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">Restablecer contraseña</button>
                    </div>

                    {/* Terms checkbox */}
                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="terms-login"
                        checked={acceptedTermsLogin}
                        onCheckedChange={(checked) => setAcceptedTermsLogin(checked === true)}
                        className="mt-0.5"
                      />
                      <label htmlFor="terms-login" className="text-xs text-muted-foreground cursor-pointer leading-relaxed">
                        Acepto los <span className="text-primary font-medium underline">términos y condiciones</span> y la <span className="text-primary font-medium underline">política de privacidad</span> de NEXVIA.
                      </label>
                    </div>

                    <button type="submit" disabled={isLoading || !acceptedTermsLogin} className="w-full h-12 rounded-lg font-semibold text-primary-foreground transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60" style={{ background: "var(--nexvia-gradient)", boxShadow: "var(--nexvia-shadow)" }}>
                      {isLoading ? <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> : (<>Iniciar sesión <ArrowRight className="h-4 w-4" /></>)}
                    </button>
                  </form>

                  {/* Or continue with */}
                  <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-sm text-muted-foreground">O continuar con</span>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                  <button type="button" className="w-full h-12 rounded-lg border border-input bg-card text-foreground font-medium flex items-center justify-center gap-3 hover:bg-accent transition-colors">
                    <img src="https://www.google.com/favicon.ico" alt="Google" className="h-5 w-5" />
                    Continuar con Google
                  </button>

                  <p className="mt-6 text-center text-sm text-muted-foreground">
                    ¿Nuevo en la plataforma?{" "}
                    <button onClick={() => setView("register")} className="font-semibold text-primary hover:text-primary/80 transition-colors">Crear cuenta</button>
                  </p>
                </>
              )}

              {/* ── REGISTER FORM ── */}
              {view === "register" && (
                <>
                  <div className="text-center mb-8">
                    <h2 className="font-display text-2xl font-bold text-foreground mb-2">Crea tu cuenta</h2>
                    <p className="text-muted-foreground">Completa tus datos para comenzar a usar NEXVIA</p>
                  </div>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground" htmlFor="reg-name">Nombre completo</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input id="reg-name" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Juan Pérez" className={inputClass} required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground" htmlFor="reg-phone">Número de celular</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input id="reg-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+57 300 123 4567" className={inputClass} required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground" htmlFor="reg-email">Correo electrónico</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input id="reg-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@empresa.com" className={inputClass} required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground" htmlFor="reg-password">Contraseña</label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input id="reg-password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo 8 caracteres" className="w-full h-12 pl-11 pr-12 rounded-lg border border-input bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary transition-all" required minLength={8} />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Terms checkbox */}
                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="terms-register"
                        checked={acceptedTerms}
                        onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
                        className="mt-0.5"
                      />
                      <label htmlFor="terms-register" className="text-xs text-muted-foreground cursor-pointer leading-relaxed">
                        Acepto los <span className="text-primary font-medium underline">términos y condiciones</span> y la <span className="text-primary font-medium underline">política de privacidad</span> de NEXVIA. Autorizo el tratamiento de mis datos personales conforme a la Ley 1581 de 2012.
                      </label>
                    </div>

                    <button type="submit" disabled={isLoading || !acceptedTerms} className="w-full h-12 rounded-lg font-semibold text-primary-foreground transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 mt-2" style={{ background: "var(--nexvia-gradient)", boxShadow: "var(--nexvia-shadow)" }}>
                      {isLoading ? <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> : (<>Crear cuenta <ArrowRight className="h-4 w-4" /></>)}
                    </button>
                  </form>
                </>
              )}

              <p className="mt-12 text-center text-xs text-muted-foreground lg:hidden">
                © {new Date().getFullYear()} NEXVIA — Gateway SMS
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
