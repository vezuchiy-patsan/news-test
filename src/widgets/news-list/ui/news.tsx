import { useSearchMediaQuery } from '@/app/api/api-query';
import { SearchMediaResponse } from '@/app/api/types';
import { Loader } from '@/shared/ui/loader';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './news.module.scss';

const IMAGE_URL = 'https://static01.nyt.com/';

export const News = () => {
	const [currentDate, setCurrentDate] = useState(dayjs());
	const [newsList, setNewsList] = useState<SearchMediaResponse>();
	const [hasMore, setHasMore] = useState(true);
	const { data, isLoading, isError } = useSearchMediaQuery(
		{
			month: (currentDate.month() + 1).toString(),
			year: currentDate.year().toString(),
		},
		{ pollingInterval: 30000 },
	);

	const fetchMoreData = () => {
		const previousDate = currentDate.subtract(1, 'month');

		// Если предыдущий месяц меньше текущего года, переходим к предыдущему году
		if (previousDate.year() < currentDate.year()) {
			setCurrentDate(previousDate.endOf('year'));
		} else {
			setCurrentDate(previousDate);
		}
	};

	useEffect(() => {
		if (data) {
			setNewsList((prev) => {
				if (!data || !data.response || !data.response.docs) {
					console.error(
						'Новые данные отсутствуют или имеют неверную структуру',
					);
					return prev || {};
				}

				if (prev && prev.response && prev.response.docs) {
					return {
						...data,
						response: {
							...data.response,
							docs: [...prev.response.docs, ...data.response.docs],
						},
					};
				}

				return data;
			});
			if (data?.response?.docs) setHasMore(data.response.docs.length > 0);
			else {
				setHasMore(false);
			}
		}
	}, [data]);

	if (isLoading) return <Loader />;
	if (isError) {
		return <div>Ошибка загрузки данных</div>;
	}
	return (
		<main>
			<InfiniteScroll
				dataLength={data?.response?.docs.length ?? 0}
				loader={<Loader />}
				next={fetchMoreData}
				hasMore={hasMore}
			>
				{newsList?.response?.docs.map((el, index) => {
					const currentDate = dayjs(el.pub_date).format('DD.MM.YYYY');

					const prevDate =
						index > 0 && newsList?.response?.docs[index - 1]
							? dayjs(newsList?.response.docs[index - 1].pub_date).format(
									'DD.MM.YYYY',
								)
							: null;
					return (
						<div key={el._id}>
							{currentDate !== prevDate && (
								<p className={styles.newsDate}>News for {currentDate}</p>
							)}
							<a href={el.web_url} className={styles.newLink} target="_blank">
								<div className={styles.newImage}>
									{el.multimedia.length > 0 && (
										<img
											className="news__image"
											src={IMAGE_URL + el.multimedia[0].url}
											alt={el.multimedia[0].caption}
										/>
									)}
								</div>
								<div className={styles.newContent}>
									<p className={styles.newSource}>{el.source}</p>
									<p className={styles.newHeadline}>{el.abstract}</p>
									<p className={styles.newDate}>
										{dayjs(el.pub_date).format('MMM D, YYYY, HH:mm A')}
									</p>
								</div>
							</a>
						</div>
					);
				})}
			</InfiniteScroll>
		</main>
	);
};
