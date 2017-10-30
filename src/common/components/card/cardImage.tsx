import * as React from 'react';
import { Card, CardProps } from '../../../model';

export interface CardImageProps {
    card: Card;
    isTransformed: boolean;
}

interface CardImageState {
    isTransformed: boolean
}

export class CardImage extends React.Component<CardImageProps, CardImageState>  {
    constructor() {
        super();
    }

    public componentDidMount() {
    }

    public componentWillReceiveProps(props: CardImageProps) {
    }

    public render() {
        var {card} = this.props;
        var className = `card ${card.set} border-${card.border_color}`;
        if (card.layout === "transform") {
            var imageClass = `card-image ${this.props.isTransformed ? "flip-backside" : "" }`
            return (
                <div className={imageClass}>
                    <div className="card-image-front">
                        <img src={card.card_faces[0].image_uris.large} title={card.name} className={className} />
                    </div>
                    <div className="card-image-back">
                        <img src={card.card_faces[1].image_uris.large} title={card.name} className={className} />
                    </div>
                </div>
            );
            
        } else {
            
            return (
                <div className="card-image">
                    <div className="card-image-front">
                        <img src={card.image_uris.large} title={card.name} className={className} />
                    </div>
                </div>
            );
        }
    }
}