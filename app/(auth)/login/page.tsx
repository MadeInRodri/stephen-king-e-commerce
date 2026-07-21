import "../../globals.css";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center px-4 font-sans">
      <main className="w-full max-w-md z-10">
        <header className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-[#ff00ff] tracking-tighter uppercase mb-3">
            EL VACÍO
          </h1>
          <p className="text-[#a3a3a3] text-base">Ingresa a la oscuridad.</p>
        </header>

        <div className="bg-[#131313] border border-[#2a2a2a] rounded-xl p-8">
          <form className="flex flex-col gap-8" method="POST">
            <div className="relative group-input pt-4">
              <input
                id="email"
                name="email"
                type="email"
                placeholder=" "
                required
                className="peer w-full bg-transparent border-0 border-b-2 border-[#404040] text-white text-base px-0 py-2 focus:outline-none focus:ring-0 transition-colors duration-300"
              />
              <label
                htmlFor="email"
                className="absolute left-0 top-6 text-[#a3a3a3] text-sm font-mono transition-all duration-300 pointer-events-none origin-left"
              >
                Correo electrónico
              </label>
            </div>

            <div className="relative group-input pt-4">
              <input
                id="password"
                name="password"
                type="password"
                placeholder=" "
                required
                className="peer w-full bg-transparent border-0 border-b-2 border-[#404040] text-white text-base px-0 py-2 focus:outline-none focus:ring-0 transition-colors duration-300"
              />
              <label
                htmlFor="password"
                className="absolute left-0 top-6 text-[#a3a3a3] text-sm font-mono transition-all duration-300 pointer-events-none origin-left"
              >
                Contraseña
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#ff00ff] text-black font-bold text-sm py-4 rounded-md mt-4 hover:bg-[#d900d9] transition-colors duration-300 active:scale-95"
            >
              Iniciar Sesión
            </button>
          </form>

          <div className="mt-8 flex flex-col items-center gap-4">
            <a
              href="#"
              className="text-sm font-mono text-[#00fbfb] hover:text-white transition-colors duration-300"
            >
              ¿Olvidaste tu contraseña?
            </a>
            <a
              href="/register"
              className="text-sm font-mono text-[#a3a3a3] hover:text-[#ff00ff] transition-colors duration-300"
            >
              Crear una cuenta
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
