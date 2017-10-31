import * as React from 'react';
import { Link } from 'react-router';
import { Card, SearchTerms, Legalities, CardProps } from '../../../model';
import { CardImage } from './cardImage';
import { CardDetails } from './cardDetails';
import { CardPrints } from './cardPrints';

interface CardState {
    isTransformed: boolean;
}

export class CardFullLayout extends React.Component<CardProps, CardState> {
    constructor() {
        super();
        this.transformClick = this.transformClick.bind(this);
        this.state = {
            isTransformed: false
        };
    }

    public componentDidMount() {
        this.setState({isTransformed: false});
    }

    private transformClick () {
        const isTransformed = !this.state.isTransformed;
        this.setState({isTransformed: isTransformed});
    }

    public render() {
        const {card} = this.props;
        return (
            <div className="card-profile">
                <div className="inner-flex">
                    <CardImage card={card} isTransformed={this.state.isTransformed} />
                    <div className="card-actions">
                        {card.layout === "transform" &&
                        <button name="button" type="submit" 
                        className="button-primary button-icon-left" title="Transform Card" data-component="card-backface-button" 
                        onClick={event => this.transformClick()}>
                            <span className="button-inner">
                                <svg aria-hidden="true" focusable="false" className="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M884.3,357.6c116.8,117.7,151.7,277-362.2,320V496.4L243.2,763.8L522,1031.3V860.8C828.8,839.4,1244.9,604.5,884.3,357.6z"></path><path d="M557.8,288.2v138.4l230.8-213.4L557.8,0v142.8c-309.2,15.6-792.1,253.6-426.5,503.8C13.6,527.9,30,330.1,557.8,288.2z"></path></svg>
                                Transform
                            </span>
                        </button>
                        }
                    </div>
                    <CardDetails card={card} />
                    <CardPrints card={card} />
                </div>
            </div>
        );
    }
}