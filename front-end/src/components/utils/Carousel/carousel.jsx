import React from 'react';
import Carousel from 'react-elastic-carousel';
import 'glider-js/glider.css';
import './carousel.css';
import Card from'../Card/card.jsx';

const items=[
    {id: 1, title: 'item #1'},
    {id: 2, title: 'item #2'},
    {id: 3, title: 'item #3'},
    {id: 4, title: 'item #4'},
    {id: 5, title: 'item #5'}
];

const GameCarousel=({games=items, platform=''})=>{
    const breakpoints=[
        {width: 1, itemsToShow: 1},
        {width: 300, itemsToShow: 3},
        {width: 768, itemsToShow: 3},
        {width: 1200, itemsToShow: 4}
    ]
    
    return(
        <>
            <div className="CarouselContainer">
                <div className="CarouselTitleBlock">
                    <h2 className="CarouselTitle"><span>{`Juegos para ${platform}`}</span></h2>
                    <div className="bar"></div>
                    <div className="icon"></div>
                </div>
                    <Carousel breakPoints={breakpoints}>
                        {
                            games.map(game=>(
                                <div className="carouselItems" key={game._id || game.id} name={game.title}>
                                    {game['_id']? <Card gameInfo={game}/>: game.title}
                                </div>
                            ))
                        }
                    </Carousel>
            </div>
        </>
    )
}

export default GameCarousel;