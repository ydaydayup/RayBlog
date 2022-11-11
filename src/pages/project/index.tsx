import React, {useState, useEffect} from 'react';

import Layout from '@theme/Layout';
import clsx from 'clsx';
import Translate, {translate} from '@docusaurus/Translate';

import ShowcaseCard from './_components/ShowcaseCard';
import {projects, groupByProjects} from '@site/data/project';

import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import {useHistory, useLocation} from '@docusaurus/router';

import styles from './styles.module.css';

const TITLE = translate({
  id: 'theme.project.title',
  message: '项目展示',
});
const DESCRIPTION = translate({
  id: 'theme.project.description',
  message: '以下项目均由本人开发，均可自由使用，部分开源。',
});

const GITHUB_URL = 'https://github.com/kuizuo';

type ProjectState = {
  scrollTopPosition: number;
  focusedElementId: string | undefined;
};

function restoreProjectState(projectState: ProjectState | null) {
  const {scrollTopPosition, focusedElementId} = projectState ?? {
    scrollTopPosition: 0,
    focusedElementId: undefined,
  };
  // @ts-expect-error: if focusedElementId is undefined it returns null
  document.getElementById(focusedElementId)?.focus();
  window.scrollTo({top: scrollTopPosition});
}

export function prepareUserState(): ProjectState | undefined {
  if (ExecutionEnvironment.canUseDOM) {
    return {
      scrollTopPosition: window.scrollY,
      focusedElementId: document.activeElement?.id,
    };
  }

  return undefined;
}

const SearchNameQueryKey = 'name';

function readSearchName(search: string) {
  return new URLSearchParams(search).get(SearchNameQueryKey);
}

function ShowcaseHeader() {
  return (
    <section className="margin-top--lg margin-bottom--lg text--center">
      <h1>{TITLE}</h1>
      <p>{DESCRIPTION}</p>
      <a
        className="button button--primary"
        href={GITHUB_URL}
        target="_blank"
        rel="noreferrer">
        <Translate id="showcase.header.button">
          🥰 前往 Github 克隆项目
        </Translate>
      </a>
    </section>
  );
}

function SearchBar() {
  const history = useHistory();
  const location = useLocation();
  const [value, setValue] = useState<string | null>(null);
  useEffect(() => {
    setValue(readSearchName(location.search));
  }, [location]);
  return (
    <div className={styles.searchContainer}>
      <input
        id="searchbar"
        placeholder="搜索项目"
        value={value ?? undefined}
        onInput={(e) => {
          setValue(e.currentTarget.value);
          const newSearch = new URLSearchParams(location.search);
          newSearch.delete(SearchNameQueryKey);
          if (e.currentTarget.value) {
            newSearch.set(SearchNameQueryKey, e.currentTarget.value);
          }
          history.push({
            ...location,
            search: newSearch.toString(),
            state: prepareUserState(),
          });
          setTimeout(() => {
            document.getElementById('searchbar')?.focus();
          }, 0);
        }}
      />
    </div>
  );
}

function ShowcaseCards() {
  if (projects.length === 0) {
    return (
      <section className="margin-top--lg margin-bottom--xl">
        <div className="container padding-vert--md text--center">
          <h2>No result</h2>
          <SearchBar />
        </div>
      </section>
    );
  }

  return (
    <section className="margin-top--lg margin-bottom--xl">
      <>
        <div className="container margin-top--lg">
          <div
            className={clsx(
              'margin-bottom--md',
              styles.showcaseFavoriteHeader,
            )}>
            {/* <SearchBar /> */}
          </div>

          {Object.entries(groupByProjects).map(([key, value]) => {
            return (
              <div key={key}>
                <div
                  className={clsx(
                    'margin-bottom--md',
                    styles.showcaseFavoriteHeader,
                  )}>
                  <h2>{key}</h2>
                </div>
                <ul className={styles.showcaseList}>
                  {value.map((project) => (
                    <ShowcaseCard key={project.title} project={project} />
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </>
    </section>
  );
}

function Showcase(): JSX.Element {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className="margin-vert--lg">
        <ShowcaseHeader />
        <ShowcaseCards />
      </main>
    </Layout>
  );
}

export default Showcase;
