import { Link } from "react-router-dom";
import { Rocket, Twitter, Github, Linkedin } from "lucide-react";

const footerLinks = {
  Product: [
    { name: "Features", path: "/features" },
    { name: "Pricing", path: "/pricing" },
    { name: "Integrations", path: "#" },
    { name: "Changelog", path: "#" },
  ],
  Company: [
    { name: "About", path: "/about" },
    { name: "Blog", path: "#" },
    { name: "Careers", path: "#" },
    { name: "Contact", path: "/contact" },
  ],
  Resources: [
    { name: "Documentation", path: "#" },
    { name: "Help Center", path: "#" },
    { name: "Community", path: "#" },
    { name: "Status", path: "#" },
  ],
  Legal: [
    { name: "Privacy", path: "#" },
    { name: "Terms", path: "#" },
    { name: "Security", path: "#" },
  ],
};

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center">
                <Rocket className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-display font-bold text-foreground">LaunchPad</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              The modern platform for launching your startup. Build, iterate, and scale with confidence.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-display font-semibold text-foreground mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} LaunchPad. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with ❤️ for founders everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};
