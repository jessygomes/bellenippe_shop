import ContactForm from "@/components/ContactForm";
import React from "react";

export default function ContactPage() {
  return (
    <section>
      <h1 className="pt-[5rem] pb-4 text-center text-[2rem] text-white font-bold uppercase bg-noir-1 bg-grid-small-white/[0.3]">
        contact
      </h1>
      <div className="flex justify-center pt-20">
        <ContactForm />
      </div>
      <div className="py-[3rem] flex justify-center"></div>
    </section>
  );
}
