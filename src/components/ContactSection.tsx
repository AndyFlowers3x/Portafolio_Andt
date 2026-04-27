"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      // Usamos Formspree para envío gratuito y fácil a tu correo: andt4x@outlook.es
      const res = await fetch("https://formspree.io/f/mqaebrjr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Nuevo mensaje de portafolio: ${formData.name}`,
        }),
      });

      if (!res.ok) {
        throw new Error("Error al enviar el mensaje. Por favor intenta de nuevo.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Error desconocido");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <SectionWrapper id="contacto">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">
            <span className="text-neon-pink">&lt;</span>
            Contacto
            <span className="text-neon-pink">/&gt;</span>
          </h2>
          <p className="text-neon-cyan/60 font-mono text-sm mb-4">Get In Touch</p>
          <p className="text-foreground/60">
            ¿Tienes un proyecto en mente o quieres colaborar? ¡Envíame un mensaje!
          </p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-foreground/70 mb-2"
              >
                Nombre
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-surface-light border border-border-color text-foreground placeholder-foreground/30 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/50 transition-all"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground/70 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-surface-light border border-border-color text-foreground placeholder-foreground/30 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/50 transition-all"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-foreground/70 mb-2"
            >
              Mensaje
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg bg-surface-light border border-border-color text-foreground placeholder-foreground/30 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/50 transition-all resize-none"
              placeholder="Cuéntame sobre tu proyecto..."
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={status === "loading"}
              className="group relative px-8 py-3 bg-linear-to-r from-neon-purple to-neon-pink text-white font-semibold rounded-lg overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              <span className="relative z-10">
                {status === "loading" ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  "Enviar Mensaje"
                )}
              </span>
            </button>

            {status === "success" && (
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-neon-green text-sm font-medium flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                ¡Mensaje enviado con éxito!
              </motion.p>
            )}

            {status === "error" && (
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-neon-red text-sm font-medium"
              >
                {errorMsg}
              </motion.p>
            )}
          </div>
        </motion.form>
      </div>
    </SectionWrapper>
  );
}
