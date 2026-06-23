import React, { useEffect, useState, useCallback, useRef } from 'react';
import  { getPostsPaginated } from '../Services/PostsServices';
import PostCard from './../components/PostCard/PostCard';
import LoadingCard from './../components/LoadingCard/LoadingCard';
import CreatePost from './../components/CreatePost/CreatePost';
import SuggestionsPage from './SuggestionPage';
import { Link } from 'react-router-dom';
import Left from './Left';

const FeedPage = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);
    
    const observerRef = useRef();
    const lastPostRef = useRef();

    // Modified getAllPosts to handle pagination
    const getAllPosts = useCallback(async (pageNum = 1, append = false) => {
        try {
            if (append) {
                setLoadingMore(true);
            } else {
                setIsLoading(true);
            }
            setError(null);

            const result = await getPostsPaginated(pageNum, 10);

            if (!result.success) {
                throw new Error('Failed to fetch posts');
            }

            const newPosts = result.posts || [];
            const pagination = result.pagination || {};

            if (append) {
                setPosts(prev => [...prev, ...newPosts]);
            } else {
                setPosts(newPosts);
            }

            setHasMore(pagination.nextPage !== null && pagination.nextPage !== undefined);
            setPage(pagination.currentPage || pageNum);

        } catch (error) {
            console.error('Error fetching posts:', error);
            setError('Failed to load posts');
        } finally {
            if (append) {
                setLoadingMore(false);
            } else {
                setIsLoading(false);
            }
        }
    }, []);

    // Load more function
    const loadMore = useCallback(async () => {
        if (!loadingMore && hasMore && !isLoading) {
            const nextPage = page + 1;
            await getAllPosts(nextPage, true);
        }
    }, [getAllPosts, hasMore, loadingMore, isLoading, page]);

    // Setup intersection observer for infinite scroll
    useEffect(() => {
        if (!hasMore || isLoading || loadingMore || posts.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            },
            { 
                threshold: 0.5,
                rootMargin: '100px'
            }
        );

        if (lastPostRef.current) {
            observer.observe(lastPostRef.current);
        }

        return () => observer.disconnect();
    }, [hasMore, isLoading, loadingMore, posts.length, loadMore]);

    // Initial load
    useEffect(() => {
        getAllPosts(1, false);
    }, []);

    // Refresh function for create post
    const refreshPosts = useCallback(() => {
        getAllPosts(1, false);
    }, [getAllPosts]);

    if (error && posts.length === 0) {
        return (
            <div className="container mx-auto p-4">
                <div className="text-center text-red-500 p-4">
                    <p>{error}</p>
                    <button 
                        onClick={() => getAllPosts(1, false)}
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            {isLoading ? (
                <div className="p-4"><LoadingCard /></div>
            ) : (
                <div className="container mx-auto p-2 sm:p-4">
                    <div className="flex justify-between gap-2">
                        <aside className="hidden xl:block w-[240px] sticky top-16 h-fit">
                            <Left />
                        </aside>

                        <main className="w-full max-w-[680px] mx-auto">
                            <CreatePost getData={refreshPosts} />
                            <div className="grid gap-3">
                                {posts.length > 0 ? (
                                    posts.map((post, index) => {
                                        const isLast = index === posts.length - 1;
                                        return (
                                            <div
                                                key={post._id}
                                                ref={isLast ? lastPostRef : null}
                                            >
                                                <PostCard 
                                                    onBookmarkUpdate={(postId, newStatus) => {
                                                        setPosts(prev => prev.map(p =>
                                                            p._id === postId ? { ...p, bookmarked: newStatus } : p
                                                        ));
                                                    }} 
                                                    getFeedPosts={refreshPosts} 
                                                    postData={post} 
                                                />
                                            </div>
                                        );
                                    })
                                ) : (
                                    <LoadingCard />
                                )}

                                {/* Loading more indicator */}
                                {loadingMore && (
                                    <div className="flex justify-center py-4">
                                        <LoadingCard />
                                    </div>
                                )}

                                {/* No more posts message */}
                                {!hasMore && posts.length > 0 && (
                                    <div className="text-center text-gray-400 text-sm py-4 border-t border-gray-200 dark:border-gray-700">
                                        ✓ You've seen all posts
                                    </div>
                                )}

                                {/* Load more button (fallback) */}
                                {hasMore && !loadingMore && posts.length > 0 && (
                                    <div className="text-center py-4">
                                        <button
                                            onClick={loadMore}
                                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Load More
                                        </button>
                                    </div>
                                )}
                            </div>
                        </main>

                        <aside className="hidden xl:block w-[280px] sticky top-16 h-[540px] overflow-hidden">
                            <SuggestionsPage />
                        </aside>
                    </div>
                </div>
            )}
        </>
    );
}

export default FeedPage;