import { Home, Briefcase } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center py-20">
      <Container className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gold mb-4">404</p>
        <h1 className="text-[32px] md:text-[40px] font-bold text-fg mb-4">This page doesn&apos;t exist.</h1>
        <p className="text-fg-muted max-w-md mx-auto mb-8 leading-relaxed">
          The page you&apos;re looking for was moved or never existed. Try the homepage or take a
          look at the projects instead.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href="/">
            <Home size={16} /> Go home
          </Button>
          <Button href="/projects" variant="secondary">
            <Briefcase size={16} /> View projects
          </Button>
        </div>
      </Container>
    </div>
  );
}
