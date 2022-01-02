import React, { useState, useEffect } from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";

/**
 * @typedef {object} UserInfo
 * @prop {"github"} identityProvider
 * @prop {string} userId
 * @prop {string} userDetails
 * @prop {string[]} userRoles
 */

/**
 * @return {UserInfo | null}
 */
function useUserInfo() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    async function getUserInfo() {
      const response = await fetch("/.auth/me");
      const payload = await response.json();
      const { clientPrincipal } = payload;
      return clientPrincipal;
    }

    getUserInfo().then((ui) => setUserInfo(ui));
  }, []);

  return userInfo;
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const userInfo = useUserInfo();

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <p>I'm a staging environment!</p>
          <div className={styles.buttons}>
            {userInfo ? (
              <p>Hello {userInfo.userDetails}</p>
            ) : (
              <a
                className="button button--secondary button--lg"
                href="/.auth/login/github"
              >
                Click here to login
              </a>
            )}
          </div>
        </div>
      </header>
    </Layout>
  );
}
