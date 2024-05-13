"use client";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  CircleUserRound,
  Heart,
  LucideLogIn,
  LucideUser,
  ShoppingCart,
} from "lucide-react";
import useCart from "@/lib/hooks/useCart";
// import { motion, useMotionValue, useTransform } from "framer-motion";

const itemNavbar = [
  {
    text: "Accueil",
    link: "/",
  },
  {
    text: "Shop",
    link: "/shop",
  },
  {
    text: "Editorial",
    link: "/editorial",
  },
  {
    text: "A Propos",
    link: "/a-propos",
  },
];

export default function Navbar() {
  const { user } = useUser();
  const cart = useCart();

  const [navActive, setNavActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  //! BURGER TO CROSS
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setIsActive(!isActive);
    setNavActive(!navActive);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(!scrolled);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const pathname = usePathname();

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <nav className={styles.nav}>
        <Link href="/">
          <Image
            className={styles.headerLogo}
            src="/images/Logos/bnFullWhiteIcon.png"
            width={300}
            height={300}
            alt="Logo de la marque Belle Nippe"
            onClick={() => handleClick()}
          />{" "}
        </Link>
        <div
          className={`${styles.nav__menuBar} ${
            isActive ? styles.activeBurger : ""
          }`}
          onClick={handleClick}
        >
          <div className={`${styles.line} ${styles.l1}`}></div>
          <div className={`${styles.line} ${styles.l2}`}></div>
          <div className={`${styles.line} ${styles.l3}`}></div>
        </div>

        <div
          className={`${navActive ? styles.active : ""} ${
            styles.nav__menuList
          }`}
        >
          {itemNavbar.map((item, index) => {
            const active =
              item.link === "/"
                ? pathname === "/"
                : pathname.startsWith(item.link);
            return (
              <div
                key={index}
                onClick={() => {
                  handleClick();
                }}
              >
                <Link
                  href={item.link}
                  className={`${styles.nav__item} ${
                    active ? styles.activeLink : ""
                  }`}
                >
                  {item.text}
                </Link>
              </div>
            );
          })}
          <div className="flex gap-4">
            <Link href="/mon-panier" className="flex">
              <ShoppingCart className={styles.nav__item} />
              <p>{cart.cartItems.length}</p>
            </Link>

            {/* <Link
              href={user ? "/mon-compte" : "/sign-in"}
              className={styles.nav__item}
            >
              <CircleUserRound />
            </Link> */}

            {user ? (
              <Link href="mon-compte" className={styles.nav__item}>
                <LucideUser />
              </Link>
            ) : (
              <Link href={"/sign-in"} className={styles.nav__item}>
                <LucideLogIn />
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
