import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

type InfiniteScrollProps = {
  children: JSX.Element | JSX.Element[] | null;
  hasMore: boolean;
  loadMore: (page: number) => void;
  className?: string;
};

const InfiniteScroll = ({
  children,
  hasMore,
  loadMore,
  className,
}: InfiniteScrollProps) => {
  const page = useRef(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (hasMore && entries[0].isIntersecting && !loading) {
          page.current += 1;
          setLoading(true);
          await loadMore(page.current);
          setLoading(false);
        }
      },
      { threshold: [0.5] }
    );
    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
      observer.disconnect();
    };
  }, [hasMore, loadMore, loading]);

  return (
    <section className={className}>
      {children}
      <div className={styles.bottomDiv} ref={bottomRef}></div>
      {loading && <div className={styles.loading}>More data loading...</div>}
    </section>
  );
};

export default InfiniteScroll;
