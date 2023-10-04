import Link from "next/link";

export const HeaderWeb = () => {
  return (
    <div className="navbar bg-primary text-primary-content">
      <Link href={"/"} className="btn btn-ghost normal-case text-xl">
        Simple Form App
      </Link>
    </div>
  );
};
