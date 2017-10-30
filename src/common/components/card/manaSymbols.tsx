import * as React from 'react';
import { numberToWords } from 'number-to-words';

interface Props {
    cost: string
}

export const ManaSymbols: React.StatelessComponent<Props> = ({cost}) => {
    return (
        <span className="card-text-mana-cost">
            {cost.replace(/}/g,' ').replace(/{/g, '').trim().split(' ').map(function(content, key) {
                var manaClass = `card-symbol card-symbol-${content}`;
                var manaTitle = '';
                switch (content)
                {
                    case 'U':
                        manaTitle = "one blue mana";
                        break;
                    case 'W':
                        manaTitle = "one white mana";
                        break;
                    case 'B':
                        manaTitle = "one black mana";
                        break;
                    case 'R':
                        manaTitle = "one red mana";
                        break;
                    case 'G':
                        manaTitle = "one green mana";
                        break;
                    case 'X':
                        manaTitle = "generic mana";
                        break;
                    case 'C':
                        manaTitle = "one colorless mana";
                        break;
                    default:
                        var numberString = numberToWords.toWords(content);
                        manaTitle = `${numberString} generic mana`;
                        break;
                }
                return (
                    <abbr className={manaClass} title={manaTitle} key={key}>{content}</abbr>
                );
            })}
        </span>
    )
}