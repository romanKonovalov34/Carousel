import React, { useEffect, useRef, useState } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { useAppSelector } from '../hooks/redux'
import './Carousel.scss'
import PaginationDots from './PaginationDots'

const Carousel = () => {

    const [activePaginationDotId, setActivePaginationDotId] = useState<number>(0)

    const products = useAppSelector(state => state.productReducer.products).filter(product => product.id <= 12)
    const countVisibleCards = 4
    const countDots = products.length / countVisibleCards

    function clickPaginationButton(direction: string) {
        if (direction === 'back') {
            if (activePaginationDotId === 0) {
                setActivePaginationDotId(countDots - 1)
            }
            else {
                setActivePaginationDotId(prev => prev - 1)
            }
        }
        else {
            if (activePaginationDotId === countDots - 1) {
                setActivePaginationDotId(0)
            }
            else {
                setActivePaginationDotId(prev => prev + 1)
            }
        }
    }

    function clickPaginationDot(id: number) {
        setActivePaginationDotId(id)
    }

    function spinCarousel() {
        const carousel = document.querySelector<HTMLElement>('.carousel__cards')
        if (carousel) {
            carousel.style.translate = String(-(1200 * activePaginationDotId)) + 'px'
        }
    }

    useEffect(() => {
        spinCarousel()
    }, [activePaginationDotId])

    return (
        <section className='carousel'>
            <div className="carousel__inner">
                <div className="carousel__window">
                    <div className="carousel__cards">

                        {products.map(product =>
                            <div className="carousel__card">
                                <img className="carousel__image" src={product.image} alt="" />
                                <div className="carousel__card-info">
                                    <h4 className="carousel__title">{product.title}</h4>
                                    <h4 className="carousel__price">${product.price}</h4>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
                <div className="carousel__pagination">
                    <div className="carousel__pagination-inner">
                        <div className="carousel__arrow-back carousel__arrow" onClick={() => clickPaginationButton('back')}>
                            <MdKeyboardArrowLeft />
                        </div>
                        <PaginationDots
                            products={products}
                            activePaginationDotId={activePaginationDotId}
                            countDots={countDots}
                            clickPaginationDot={clickPaginationDot}
                        />
                        <div className="carousel__arrow-next carousel__arrow" onClick={() => clickPaginationButton('next')}>
                            <MdKeyboardArrowRight />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Carousel
