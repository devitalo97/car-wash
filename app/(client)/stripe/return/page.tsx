"use client";

import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { retriveCheckoutSession } from "@/app/lib/actions";

export default function Return() {
  const [status, setStatus] = useState<string | null>(null);
  const [customerDetails, setCustomerDetails] = useState<object | null>(null);

  useEffect(() => {
    (async () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const sessionId = urlParams.get("session_id");

      const formData = new FormData();
      formData.append("session_id", sessionId as string);
      ("use server");
      const result = await retriveCheckoutSession(formData);

      setStatus(result.status);
      setCustomerDetails(result.customer_details);
    })();
  }, []);

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{" "}
          {JSON.stringify(customerDetails)}. If you have any questions, please
          email <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    );
  }

  return null;
}
