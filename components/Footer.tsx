import { Link } from "@heroui/link";

export default function Footer() {
  return (
    <footer className="w-full flex items-center justify-center py-4 gap-1 mb-4">
      <span className="text-default-600">Made with ❤️ by</span>
      <Link
        isExternal
        className="flex items-center gap-1 text-current"
        href="https://github.com/pullcommitpush"
        title="Pull Commit Push"
      >
        <p className="text-primary">Riccardo Bevilacqua</p>
      </Link>
    </footer>
  );
}
