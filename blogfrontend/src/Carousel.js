import React, { useState, useEffect } from 'react';

// 假设你有三个图片在你的公共文件夹或者通过URL可以访问
const slideImages = ['img/4.jpg', 'img/2.jpg', 'img/5.jpg']; // 根据实际情况替换路径

const styles = {
    carouselContainer: {
        display: 'flex',
        justifyContent: 'center', // 左右对齐
        alignItems: 'center',//垂直居中对齐
        width: '100vw', // 宽度占据视口的100%
        overflow: 'hidden', // 防止内容溢出
        position: 'relative',
    },
    carouselBox: {
        display: 'flex',
        justifyContent: 'flex-start', // 子元素从盒子左侧开始
        alignItems: 'center',
        width: '80vw', // 轮播宽度为视口宽度的80%
        height: '400px', // 高度根据内容自动调整
    },
    carouselPic: {
        width: '50%', // 图片占轮播盒子宽度的一半
        height: '100%',
        objectFit: 'cover', // 图片覆盖整个容器区域
    },
    carouselText: {
        width: '50%', // 文字占轮播盒子宽度的一半
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'left',
        padding: '20px',
        backgroundColor: '#f0f0f0', // 背景色
        boxSizing: 'border-box', // 确保内边距不影响宽度
    },

}

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        {
            img: slideImages[0],
            title: 'HAVE A HAPPY GLUTEN FREE LIFE',
            description: 'Embrace the joy of wellness with delicious choices for a gluten-free journey',
        },
        {
            img: slideImages[1],
            title: 'EASY GLUTEN FREE RECIPES',
            description: 'Savor simplicity and flavor with our quick and delightful gluten-free recipes',
        },
        {
            img: slideImages[2],
            title: 'FIND GLUTEN FREE RESTAURANTS',
            description: 'Explore local delights! Discover the best gluten-free dining options right in your neighborhood',
        },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000); // 每5秒切换到下一张幻灯片

        return () => clearInterval(timer); // 清除定时器
    }, [slides.length]);//当达到最后一张幻灯片后，这个表达式会把索引重置为0，从而回到第一张幻灯片

    const nextSlide = () => {
        setCurrentSlide((currentSlide + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    };

    return (
        <div style={styles.carouselContainer}>
            {/* 左侧按钮 */}
            <button
                onClick={prevSlide}
                style={{
                    position: 'absolute',
                    left: '50px', // 按钮在轮播盒子外
                    zIndex: 10,
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'transparent', /* 设置背景颜色为透明 */
                    border: '2px solid #00bfa5',      /* 设置边框宽度为2px，样式为实线，颜色为绿色 */
                    color: '#00bfa5',
                }}
            >
                &lt;
            </button>

            {/* 轮播幻灯片容器 */}
            <div style={styles.carouselBox}>
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        style={{
                            display: index === currentSlide ? 'flex' : 'none',
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <img src={slide.img} alt={`Slide ${index}`} style={styles.carouselPic}/>
                        <div style={styles.carouselText}>
                            <h1>{slide.title}</h1>
                            <p>{slide.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* 右侧按钮 */}
            <button
                onClick={nextSlide}
                style={{
                    position: 'absolute',
                    right: '50px', // 按钮在轮播盒子外
                    zIndex: 10,
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'transparent', /* 设置背景颜色为透明 */
                    border: '2px solid #00bfa5',      /* 设置边框宽度为2px，样式为实线，颜色为绿色 */
                    color: '#00bfa5',
                }}
            >
                &gt;
            </button>
        </div>
    );
};

export default Carousel;
