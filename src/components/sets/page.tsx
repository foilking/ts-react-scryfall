import * as React from 'react';
import { Link } from 'react-router';
import { Header } from '../../components';
import { Set } from '../../model';

interface Props {
    sets: Set[],
    fetchSets: () => void;
}

export class SetsPage extends React.Component<Props, {}>{
    constructor(props) {
        super(props);
        this.props.fetchSets();
    }

    public render() {
        const { sets } = this.props;
        let mappedSets = null;
        
        return (
            <div className="checklist-wrapper">
                <table className="checklist">
                    <thead>
                        <tr>
                            <th><span className="visuallyhidden">Symbol</span></th>
                            <th>Name</th>
                            <th>Block/Group</th>
                            <th>Cards</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sets && sets.filter((set) => set.parent_set_code == null).map((set, key) => {
                            return (
                                <tr key={key}>
                                    <td className="set-symbol">
                                        <Link to={`/set/${set.code}`} >
                                            <img aria-hidden="true" className="" src={set.icon_svg_uri} />
                                        </Link>            
                                    </td>
                                    <td>
                                        <Link to={`/set/${set.code}`} >
                                            {set.name} <small>{set.code.toUpperCase()}</small>
                                        </Link>            
                                    </td>
                                    <td>
                                        <Link to={`/set/${set.code}`} >—</Link>
                                    </td>
                                    <td><Link to={`/set/${set.code}`} >{set.card_count}</Link></td>
                                    <td><Link to={`/set/${set.code}`} >Release Date</Link></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}