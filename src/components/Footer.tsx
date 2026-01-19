"use client";


function Footer() {
  return (
    <footer className="border-t border-white/60 py-10">
      <div className="container-shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Perfume Recommendation System</p>
          <p>Built by a perfume nerd. Powered by real data.</p>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
