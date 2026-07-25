"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaShoppingCart, FaFilePdf, FaEnvelope } from "react-icons/fa";
import Footer from "@/components/ui/Footer";
import Nav from "@/components/ui/Nav";
import { useRouter } from "next/navigation";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

import { CartBook, userSession } from "@/types/index";
import DesktopHeader from "@/components/ui/DesktopHeader";
import MobileHeader from "@/components/ui/MobileHeader";

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartBook[]>([]);
  const [userName, setUserName] = useState<string>(
    "A EL BAZAR DE LAS PESADILLAS",
  );
  const route = useRouter();

  useEffect(() => {
    const fetchBooks = async () => {
      const activeSession = sessionStorage.getItem("activeUser");
      if (!activeSession) {
        route.push("/login");
      }
      try {
        const savedCart = localStorage.getItem("cartItems");
        if (savedCart) setCartItems(JSON.parse(savedCart));

        const user: userSession = JSON.parse(activeSession as string);
        setUserName(user.fullName);
      } catch (error) {
        console.error("Error cargando los libros:", error);
      }
    };

    fetchBooks();
  }, []);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const exit = () => {
    //Destruimos la sesión
    sessionStorage.clear();
    toast.info("Se ha cerrado sesión exitosamente, redirigiendo...");
    setTimeout(() => {
      route.push("/");
    }, 2000);
  };

  const shipping = 5.0;
  const finalTotal = total > 0 ? total + shipping : 0;

  const handleDownloadPDF = async () => {
    toast.info("Generando pdf...");

    try {
      const element = document.getElementById("factura-table");
      if (!element) return;

      const dataUrl = await toPng(element, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: "#131313",
        style: {
          overflow: "hidden",
          padding: "20px",
        },
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.setFillColor(5, 5, 5);
      pdf.rect(0, 0, pdfWidth, pdfHeight, "F");
      const margin = 15;
      const imgWidth = pdfWidth - margin * 2;

      const imgProps = pdf.getImageProperties(dataUrl);
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      pdf.addImage(dataUrl, "PNG", margin, 20, imgWidth, imgHeight);

      setTimeout(() => {
        pdf.save("factura-bazar-pesadillas.pdf");
      }, 2000);
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };

  const handleSendEmail = async () => {
    const userData: userSession = JSON.parse(
      sessionStorage.getItem("activeUser") as string,
    );

    const userName = userData.fullName;
    const userEmail = userData.email;

    const toastId = toast.loading("Invocando a los mensajeros de la niebla...");

    try {
      const templateParams = {
        user_name: userName,
        email: userEmail,
        total_amount: finalTotal.toFixed(2),
      };

      await emailjs.send(
        "service_hbbl2su",
        "template_82kpvta",
        templateParams,
        "Vll8lTttY86JaI4Y8",
      );
      toast.success("Recibo enviado exitosamente a tu destino.", {
        id: toastId,
      });
    } catch (error) {
      toast.error("Hubo una interferencia en el vacío. Intenta de nuevo.", {
        id: toastId,
      });
    }
  };

  return (
    <div className="text-[#e5e2e1] min-h-screen flex flex-col relative overflow-x-hidden bg-[#050505] font-sans">
      <header className="bg-[#131313]/90 backdrop-blur-xl fixed top-0 w-full border-b border-white/10 z-30">
        <DesktopHeader
          userName={userName}
          action={exit}
          cartAction={() => {
            route.push("/cart");
          }}
        />

        <MobileHeader
          userName={userName}
          action={exit}
          cartAction={() => {
            route.push("/cart");
          }}
        />
      </header>

      <main className="flex-grow pt-28 pb-32 px-4 md:px-16 max-w-7xl w-full mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Finalizar Compra
          </h1>
          <p className="text-[#a3a3a3] mt-2">
            Revisa los detalles de tu orden antes de generar la factura.
          </p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
          <div className="w-full lg:col-span-4 order-1 lg:order-2 sticky top-[120px]">
            <div className="bg-[#131313] border border-white/10 rounded-xl p-6 shadow-2xl relative overflow-hidden">
              <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest border-b border-white/10 pb-4">
                Resumen de Factura
              </h2>

              <div className="space-y-4 text-sm text-[#a3a3a3]">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="text-white">${total.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Envío (A la niebla)</span>
                  <span className="text-white">${shipping.toFixed(2)} USD</span>
                </div>
                <hr className="border-t border-dashed border-white/10 my-4" />
                <div className="flex justify-between items-center text-lg">
                  <span className="text-white font-bold">Total Final</span>
                  <span className="text-[#00fbfb] font-mono font-bold">
                    ${finalTotal.toFixed(2)} USD
                  </span>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-4">
                <button
                  onClick={handleDownloadPDF}
                  className="w-full bg-[#ff00ff] text-black font-bold py-3 rounded-md uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#d900d9] transition-colors active:scale-95 text-sm"
                >
                  <FaFilePdf className="text-lg" />
                  Descargar Factura PDF
                </button>

                <button
                  onClick={handleSendEmail}
                  className="w-full border border-[#00fbfb] text-[#00fbfb] font-bold py-3 rounded-md uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#00fbfb]/10 transition-colors active:scale-95 text-sm"
                >
                  <FaEnvelope className="text-lg" />
                  Enviar al Correo
                </button>
              </div>
            </div>
          </div>

          <div className="w-full lg:col-span-8 order-2 lg:order-1">
            <div className="bg-[#131313] border border-white/10 rounded-xl p-2 md:p-6 overflow-x-auto">
              <table
                className="w-full text-left border-collapse min-w-[500px]"
                id="factura-table"
              >
                <thead>
                  <tr className="border-b border-white/10 text-[#a3a3a3] uppercase text-xs font-mono tracking-widest">
                    <th className="py-4 px-2 font-normal">Producto</th>
                    <th className="py-4 px-2 font-normal text-center">Cant.</th>
                    <th className="py-4 px-2 font-normal text-right">
                      Precio Unit.
                    </th>
                    <th className="py-4 px-2 font-normal text-right">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {cartItems.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center py-8 text-[#a3a3a3]"
                      >
                        El carrito está vacío.
                      </td>
                    </tr>
                  ) : (
                    cartItems.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="py-4 px-2">
                          <span className="font-bold text-white block">
                            {item.title}
                          </span>
                          {/* <span className="text-xs text-[#a3a3a3] font-mono">
                            ID: {item.id}
                          </span> */}
                        </td>
                        <td className="py-4 px-2 text-center text-white">
                          {item.quantity}
                        </td>
                        <td className="py-4 px-2 text-right text-[#a3a3a3] font-mono">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="py-4 px-2 text-right text-[#00fbfb] font-mono font-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
                {cartItems.length > 0 && (
                  <tfoot>
                    <tr className="border-t border-white/10 text-sm">
                      <td
                        colSpan={3}
                        className="py-3 px-2 text-right text-[#a3a3a3]"
                      >
                        Subtotal
                      </td>
                      <td className="py-3 px-2 text-right text-white font-mono">
                        ${total.toFixed(2)} USD
                      </td>
                    </tr>

                    <tr className="text-sm">
                      <td
                        colSpan={3}
                        className="py-3 px-2 text-right text-[#a3a3a3]"
                      >
                        Envío (A la niebla)
                      </td>
                      <td className="py-3 px-2 text-right text-white font-mono">
                        ${shipping.toFixed(2)} USD
                      </td>
                    </tr>

                    <tr className="border-t border-dashed border-white/10 text-base md:text-lg">
                      <td
                        colSpan={3}
                        className="py-4 px-2 text-right text-white font-bold uppercase tracking-widest text-xs md:text-sm"
                      >
                        Total Final
                      </td>

                      <td className="py-4 px-2 text-right text-[#00fbfb] font-mono font-bold">
                        ${finalTotal.toFixed(2)} USD
                      </td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
