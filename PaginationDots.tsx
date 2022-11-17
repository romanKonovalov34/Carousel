import React, { useMemo } from 'react'
import { IProduct } from '../store/reducers/ProductSlice'

interface IPaginationDotsProps {
    products: IProduct[]
    activePaginationDotId: number
    countDots: number
    clickPaginationDot: (id: number) => void
}

const PaginationDots: React.FC<IPaginationDotsProps> = ({ products, activePaginationDotId, countDots, clickPaginationDot }) => {

    const arrOfID = useMemo(() => {
        return new Array(countDots).fill(0).map((elem, index) => index)
    }, [countDots])
    
    return (
        <div>
            <div className="carousel__pagination-dots">
                {arrOfID.map(id =>
                    <span
                        key={id}
                        className={activePaginationDotId === id ? 'carousel__pagination-dot  carousel__pagination-dot_active' : 'carousel__pagination-dot'}
                        onClick={() => clickPaginationDot(id)}
                    ></span>
                )}

            </div>
        </div>
    )
}

export default PaginationDots



