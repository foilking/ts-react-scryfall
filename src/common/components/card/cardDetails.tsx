import * as React from 'react';
import { numberToWords } from 'number-to-words';
import { Card, CardProps } from '../../../model';
import { CardLegalities } from './cardLegalities';
import { ManaSymbols } from './manaSymbols';
import {OracleText} from './oracleText';

export const CardDetails: React.StatelessComponent<CardProps> = ({card}) => {
    var artistLink = `/search?q=%2B%2Ba%3A%22${card.artist.replace(' ', '+')}%22`
    if (card.layout === "transform") {
        var cardFront = card.card_faces[0];
        var cardBack = card.card_faces[1];
        return (
            <div className="card-text">
                <h1 className="card-text-title">
                    {cardFront.name}
                    <ManaSymbols cost={cardFront.mana_cost} />
                </h1>
                <p className="card-text-type-line">
                    {cardFront.type_line}
                </p>
                <div className="card-text-box">
                    {cardFront.oracle_text && 
                        <OracleText oracleText={cardFront.oracle_text} oracleClass="card-text-oracle" />
                    }
                    {cardFront.flavor_text && 
                        <div className="card-text-flavor">
                            <p>{cardFront.flavor_text}</p>
                        </div>
                    }
                </div>
                {(cardFront.type_line.includes('Creature') || cardFront.type_line.includes('Planeswalker')) &&
                    <div className="card-text-stats">
                        {cardFront.type_line.includes('Creature') &&
                            `${cardFront.power}/${cardFront.toughness}`
                        }
                        {cardFront.type_line.includes('Planeswalker') &&
                            `Loyalty: ${cardFront.loyalty}`
                        }
                    </div>
                }
                <h1 className="card-text-title">
                    {cardBack.name}
                </h1>
                <p className="card-text-type-line">
                    {cardBack.type_line}
                </p>
                <div className="card-text-box">
                    {cardBack.oracle_text && 
                        <OracleText oracleText={cardBack.oracle_text} oracleClass="card-text-oracle" />
                    }
                    {cardBack.flavor_text && 
                        <div className="card-text-flavor">
                            <p>{cardBack.flavor_text}</p>
                        </div>
                    }
                </div>
                {cardBack.type_line.includes('Creature') &&
                    <div className="card-text-stats">
                        {cardBack.power}/{cardBack.toughness}
                    </div>
                }
                <p className="card-text-artist">
                    Illustrated by <a href={artistLink}>{card.artist}</a>
                </p>
                <CardLegalities legalities={card.legalities} />
            </div>
        );
    } else {
        return (
            <div className="card-text">
                <h1 className="card-text-title">
                    {card.name}
                    <ManaSymbols cost={card.mana_cost} />
                </h1>
                <p className="card-text-type-line">
                    {card.type_line}
                </p>
                <div className="card-text-box">
                    
                    {card.oracle_text && 
                        <OracleText oracleText={card.oracle_text} oracleClass="card-text-oracle" />
                    }
                    {card.flavor_text && 
                        <div className="card-text-flavor">
                            <p>{card.flavor_text}</p>
                        </div>
                    }
                </div>
                {(card.type_line.includes('Creature') || card.type_line.includes('Planeswalker')) &&
                    <div className="card-text-stats">
                        {card.type_line.includes('Creature') &&
                            `${card.power}/${card.toughness}`
                        }
                        {card.type_line.includes('Planeswalker') &&
                            `Loyalty: ${card.loyalty}`
                        }
                    </div>
                }
                <p className="card-text-artist">
                    Illustrated by <a href={artistLink}>{card.artist}</a>
                </p>
                <CardLegalities legalities={card.legalities} />
            </div>
        );
    }
}