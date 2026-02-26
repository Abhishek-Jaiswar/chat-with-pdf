import Navbar from "@/components/navbar";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const trustBadges = ["Acme Labs", "Northstar VC", "Hexa Analytics", "Unify AI"];

const features = [
  {
    title: "Grounded Answers",
    description:
      "Every response is generated from your uploaded documents, not generic web guesses.",
  },
  {
    title: "Multi-PDF Workspace",
    description:
      "Search and chat across multiple files in one thread to keep research in one place.",
  },
  {
    title: "Team-Ready",
    description:
      "Use shared knowledge bases for faster onboarding and better collaboration.",
  },
  {
    title: "Fast Summaries",
    description:
      "Turn long reports into concise briefs, action items, and key takeaways in seconds.",
  },
];

const workflow = [
  {
    step: "01",
    title: "Upload",
    detail: "Drop in PDFs, docs, and notes.",
  },
  {
    step: "02",
    title: "Ask",
    detail: "Chat naturally and request insights.",
  },
  {
    step: "03",
    title: "Decide",
    detail: "Use cited answers to move faster.",
  },
];

export default function HomePage() {
  return (
    <main>
      <Navbar />

      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-muted/50" />
        <div className="absolute -left-24 top-10 -z-10 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -right-16 top-24 -z-10 h-72 w-72 rounded-full bg-chart-2/15 blur-3xl" />

        <div className="mx-auto grid w-full max-w-7xl gap-14 px-6 py-20 md:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-4 inline-flex rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
              AI copilot for your private knowledge base
            </p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              The SaaS workspace for{" "}
              <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                document-first teams
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
              YupRAG helps teams chat with documents, generate trusted answers,
              and turn research into decisions without context switching.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/dashboard" className={buttonVariants({ size: "lg" })}>
                Start Free Trial
              </Link>
              <Link
                href="#pricing"
                className={buttonVariants({ size: "lg", variant: "outline" })}
              >
                See Pricing
              </Link>
            </div>

            <div className="mt-8 grid max-w-lg grid-cols-3 gap-3">
              <div className="rounded-lg border bg-card p-3">
                <p className="text-xl font-semibold">12k+</p>
                <p className="text-xs text-muted-foreground">documents indexed</p>
              </div>
              <div className="rounded-lg border bg-card p-3">
                <p className="text-xl font-semibold">99.9%</p>
                <p className="text-xs text-muted-foreground">service uptime</p>
              </div>
              <div className="rounded-lg border bg-card p-3">
                <p className="text-xl font-semibold">4.9/5</p>
                <p className="text-xs text-muted-foreground">user rating</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Project: Q2 Product Plan</p>
              <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                Live
              </span>
            </div>
            <div className="mt-4 rounded-xl border bg-background p-4">
              <p className="text-xs text-muted-foreground">Prompt</p>
              <p className="mt-1 text-sm">
                Compare competitor pricing pages and suggest a GTM narrative
                with risks.
              </p>
            </div>
            <div className="mt-3 rounded-xl border bg-muted/40 p-4">
              <p className="text-xs text-muted-foreground">YupRAG Response</p>
              <p className="mt-1 text-sm">
                3 positioning angles generated with source-backed insights and
                priority action list.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg border bg-background p-3">
                <p className="text-muted-foreground">Avg response time</p>
                <p className="mt-1 font-semibold">6.1s</p>
              </div>
              <div className="rounded-lg border bg-background p-3">
                <p className="text-muted-foreground">Sources attached</p>
                <p className="mt-1 font-semibold">8 citations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b py-8">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-6 px-6 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Trusted by teams at</span>
          {trustBadges.map((company) => (
            <span key={company} className="rounded-md border px-3 py-1">
              {company}
            </span>
          ))}
        </div>
      </section>

      <section id="features" className="py-20 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Everything you expect from modern SaaS, built for docs
            </h2>
            <p className="mt-3 text-muted-foreground">
              Powerful retrieval, clear UX, and production-ready workflows in a
              clean product experience.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {features.map((feature) => (
              <article key={feature.title} className="rounded-xl border bg-card p-6">
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="workflow" className="border-y bg-muted/30 py-20 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Fast onboarding, immediate value
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {workflow.map((item) => (
              <article key={item.step} className="rounded-xl border bg-background p-6">
                <p className="text-sm font-semibold text-primary">{item.step}</p>
                <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Simple pricing for every stage
            </h2>
            <p className="mt-3 text-muted-foreground">
              Start free. Upgrade when your team is ready for scale.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
            <article className="rounded-xl border bg-card p-6">
              <p className="text-sm font-medium">Starter</p>
              <p className="mt-2 text-3xl font-bold">
                $0<span className="text-sm font-normal text-muted-foreground">/mo</span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">For personal workflows.</p>
              <Link href="/dashboard" className={`${buttonVariants({ variant: "outline" })} mt-5 w-full`}>
                Try Free
              </Link>
            </article>

            <article className="rounded-xl border-2 border-primary bg-card p-6 shadow-sm">
              <p className="text-sm font-medium text-primary">Pro</p>
              <p className="mt-2 text-3xl font-bold">
                $29<span className="text-sm font-normal text-muted-foreground">/mo</span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">For power users and small teams.</p>
              <Link href="/dashboard" className={`${buttonVariants()} mt-5 w-full`}>
                Start Pro
              </Link>
            </article>

            <article className="rounded-xl border bg-card p-6">
              <p className="text-sm font-medium">Enterprise</p>
              <p className="mt-2 text-3xl font-bold">Custom</p>
              <p className="mt-2 text-sm text-muted-foreground">For larger orgs and compliance needs.</p>
              <Link href="/pricing" className={`${buttonVariants({ variant: "outline" })} mt-5 w-full`}>
                Contact Sales
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto w-full max-w-5xl rounded-2xl border bg-card px-6 py-14 text-center shadow-sm md:px-10">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Ready to make docs your competitive advantage?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Move from reading and searching to shipping and deciding with
            confidence.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/dashboard" className={buttonVariants({ size: "lg" })}>
              Start Free Trial
            </Link>
            <Link
              href="/pricing"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
