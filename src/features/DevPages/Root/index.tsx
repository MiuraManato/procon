import Link from "next/link";
import styles from "./index.module.css";

export const RootPage = () => {
	return (
		<>
			<h1 className={styles.title}>開発者用ページ *開発終了時に削除します</h1>
			<div className={styles.list}>
				<div className={styles.items}>
					<Link href={"/employees"} className={styles.link}>
						<div className={styles.item}>従業員用</div>
					</Link>
				</div>
				<div className={styles.items}>
					<Link href={"/order/menu"} className={styles.link}>
						<div className={styles.item}>注文端末用</div>
					</Link>
				</div>
				<div className={styles.items}>
					<Link href={"/user/top"} className={styles.link}>
						<div className={styles.item}>Webシステム用(ユーザー)</div>
					</Link>
				</div>
			</div>
		</>
	);
};
