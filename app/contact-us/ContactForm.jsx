"use client";

import { useMemo, useState } from "react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(() => {
    const next = {};

    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.email.trim()) next.email = "Please enter your email address.";
    else if (!EMAIL_PATTERN.test(values.email.trim()))
      next.email = "Please enter a valid email address.";

    const message = values.message.trim();
    if (!message) next.message = "Please write a short message.";
    else if (message.length < 20)
      next.message =
        "Please add a little more detail (at least 20 characters).";

    return next;
  }, [values]);

  const hasErrors = Object.keys(errors).length > 0;

  function onChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function onBlur(e) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  function onSubmit(e) {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });

    if (Object.keys(errors).length > 0) return;

    // No backend per requirement: show a confirmation state only.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-slate-700">
        <h2 className="text-lg font-bold text-[#001f42]">Message prepared</h2>
        <p className="mt-2 text-[15px] leading-relaxed">
          Thanks — your message is ready to be sent. Since this site doesn’t
          store form submissions yet, please email us directly and copy/paste
          your message.
        </p>
        <div className="mt-4 rounded-xl bg-white p-4 text-[14px]">
          <p>
            <span className="font-semibold">To:</span>{" "}
            support@clinicinfo.trailflow.in
          </p>
          <p>
            <span className="font-semibold">Subject:</span> ClinicInfo website
            inquiry
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setValues({ name: "", email: "", message: "" });
            setTouched({ name: false, email: false, message: false });
          }}
          className="mt-5 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div>
        <label className="text-sm font-semibold text-slate-700" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          value={values.name}
          onChange={onChange}
          onBlur={onBlur}
          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-700 outline-none ring-0 transition focus:border-clinic-300"
          placeholder="Your name"
          autoComplete="name"
        />
        {touched.name && errors.name ? (
          <p className="mt-2 text-sm text-rose-600">{errors.name}</p>
        ) : null}
      </div>

      <div>
        <label className="text-sm font-semibold text-slate-700" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          value={values.email}
          onChange={onChange}
          onBlur={onBlur}
          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-700 outline-none ring-0 transition focus:border-clinic-300"
          placeholder="you@example.com"
          autoComplete="email"
          inputMode="email"
        />
        {touched.email && errors.email ? (
          <p className="mt-2 text-sm text-rose-600">{errors.email}</p>
        ) : null}
      </div>

      <div>
        <label
          className="text-sm font-semibold text-slate-700"
          htmlFor="message"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={values.message}
          onChange={onChange}
          onBlur={onBlur}
          rows={6}
          className="mt-2 w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-700 outline-none ring-0 transition focus:border-clinic-300"
          placeholder="Tell us what you were trying to do, and what didn’t work…"
        />
        {touched.message && errors.message ? (
          <p className="mt-2 text-sm text-rose-600">{errors.message}</p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={
          hasErrors && (touched.name || touched.email || touched.message)
        }
        className="w-full rounded-2xl bg-[#001f42] px-6 py-4 text-sm font-bold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Prepare message
      </button>

      <p className="text-xs text-slate-500">
        This form does not store submissions yet. For urgent medical concerns,
        contact a qualified healthcare professional or your local emergency
        number.
      </p>
    </form>
  );
}
