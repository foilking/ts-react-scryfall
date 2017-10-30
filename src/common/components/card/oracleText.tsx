import * as React from 'react';
import { numberToWords } from 'number-to-words';


interface OracleProps {
    oracleText: string;
    oracleClass: string;
}

interface TextFragment {
    line: string;
    isItalicized: boolean;
}

export const OracleText: React.StatelessComponent<OracleProps> = ({oracleText, oracleClass}) => {
    return (
        <div className={oracleClass}>
            {/* Split the Oracle text into separate lines */}
            {oracleText.split('\n').map(function (line, lineKey) {
                const textFragments = [] as TextFragment[];
                // If there's an ability word, italicize it
                if (line.indexOf('\u2014') > -1) {
                    var ability = line.substring(0, line.indexOf('\u2014') - 1);
                    var textLine = {
                        line: ability,
                        isItalicized: true
                    } as TextFragment;
                    textFragments.push(textLine);
                    line = line.substring(line.indexOf('\u2014') - 1);
                }
                // This should only run once, but I have a feeling there's at least one card with reminder text twice in the same line
                while (line.indexOf("(") > -1) {
                    // Get everything up to the open parens
                    var textLine = {
                        line: line.substring(0, line.indexOf("(") - 1),
                        isItalicized: false
                    } as TextFragment;
                    line = line.substring(line.indexOf('(') - 1);
                    textFragments.push(textLine);

                    // Get everything up to the closing parens
                    var reminderLine = {
                        line: line.substring(0, line.indexOf(')') + 1),
                        isItalicized: true
                    } as TextFragment;
                    line = line.substring(line.indexOf(')') + 1);
                    textFragments.push(reminderLine);
                }
                textFragments.push({
                    line: line,
                    isItalicized: false
                } as TextFragment);
                
                return (
                    <p key={lineKey}>
                    {textFragments.map(function (content, contentKey) {
                        const symbols = content.line.split(/({\w})/g);
                        if (content.isItalicized) {
                            return (
                                <i key={contentKey}>{symbols.map(replaceSymbols)}</i>
                            )
                        } else {
                            return (
                                <text key={contentKey}>{symbols.map(replaceSymbols)}</text>
                            )
                        }
                    })}
                    </p>
                )
            })}
        </div>
    )
}

function replaceSymbols (content: string) {
    if (content.indexOf('{') > -1) {
        var symbolCharacter = content.replace(/}/g,' ').replace(/{/g, '').trim();
        var symbolClass = `card-symbol card-symbol-${symbolCharacter}`;
        var symbolTitle = '';
        switch (symbolCharacter)
        {
            case 'U':
                symbolTitle = "one blue mana";
                break;
            case 'W':
                symbolTitle = "one white mana";
                break;
            case 'B':
                symbolTitle = "one black mana";
                break;
            case 'R':
                symbolTitle = "one red mana";
                break;
            case 'G':
                symbolTitle = "one green mana";
                break;
            case 'X':
                symbolTitle = "generic mana";
                break;
            case 'T':
                symbolTitle = "tap this permanent";
                break;
            case 'C':
                symbolTitle = "one colorless mana";
                break;
            default:
                var numberString = numberToWords.toWords(symbolCharacter);
                symbolTitle = `${numberString} generic mana`;
                break;
        }
        return (
            <abbr className={symbolClass} title={symbolTitle}>{content}</abbr>
        )
    } else {
        return (
            <text>{content}</text>
        )
    }
}