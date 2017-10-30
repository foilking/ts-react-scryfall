import * as React from 'react';
import { Card} from '../../model';
import { CardFullLayout } from '../../common/components/card';

interface Props {
    setCode: string;
    collectorNumber: string;
    fetchCardByCodeAndCollectorNumber: (setCode: string, collectorNumber: string) => void;
    card: Card;
}

interface State {
    isTransformed: boolean;
}

export class CardPage extends React.Component<Props, State> {
    constructor() {
        super();
        this.fetchCardByCodeAndCollectorNumber = this.fetchCardByCodeAndCollectorNumber.bind(this);
    }

    public componentDidMount() {
        this.props.fetchCardByCodeAndCollectorNumber(this.props.setCode, this.props.collectorNumber);
    }

    private fetchCardByCodeAndCollectorNumber() {
        this.props.fetchCardByCodeAndCollectorNumber(this.props.setCode, this.props.collectorNumber);
    }

    public render() {
        // Making sure the card is available
        if (this.props.card) {
            const {card} = this.props;
            return (
                <CardFullLayout card={card}/>
            )
        } else {
            return (
                <div className="row">No Card Found</div>
            )
        }
    };
}