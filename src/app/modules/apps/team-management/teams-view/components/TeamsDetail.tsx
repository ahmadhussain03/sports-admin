import ShowMoreText from "react-show-more-text";
import { Team } from '../../teams-list/core/_models';

interface ITeamsDetail {
    team: Team
}

const TeamsDetail: React.FC<ITeamsDetail> = ({ team }) => {
    return (
        <div className='container'>
            <div className="row">
                <div className="card card-custom col me-4">
                    <div className="card-body">
                        <div className="d-flex flex-column">
                            <h1>Team Information</h1>
                            <div className="d-flex flex-column my-4">
                                <p className="fs-5 m-0">Name</p>
                                <h3 className='m-0'>{team.name}</h3>
                            </div>
                            <div className="d-flex flex-column my-4">
                                <p className="fs-5 m-0">League</p>
                                <h3 className='m-0'>{team.league}</h3>
                            </div>
                            <div className="d-flex flex-column my-4">
                                <p className="fs-5 m-0"># Of Players</p>
                                <h3 className='m-0'>{team.players_count}</h3>
                            </div>
                            <div className="d-flex flex-column my-4">
                                <p className="fs-5 m-0">Training Sessions</p>
                                <h3 className='m-0'>{team.training_count}</h3>
                            </div>
                            <div className="d-flex flex-column my-4">
                                <p className="fs-5 m-0">Games</p>
                                <h3 className='m-0'>{team.game_count}</h3>
                            </div>
                            {!!team.notes && (
                                <div className="d-flex flex-column my-4">
                                    <p className="fs-5 m-0">Notes</p>
                                    <h3>
                                        <ShowMoreText
                                            lines={4}
                                            more="Show more"
                                            less="Show less"
                                            className="content-css"
                                            anchorClass="my-anchor-css-class"
                                            expanded={false}
                                            truncatedEndingComponent={"... "}
                                        >
                                            {team.notes}

                                        </ShowMoreText>
                                    </h3>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="card card-custom col me-4">
                    <div className="card-body">
                        <div className="d-flex flex-column">
                            <h1>Financial Information</h1>
                            <div className="d-flex flex-column my-4">
                                <p className="fs-5 m-0">Session Attended</p>
                                <h3 className='m-0'>{team.session_attended_count}</h3>
                            </div>
                            <div className="d-flex flex-column my-4">
                                <p className="fs-5 m-0">Session Outstanding</p>
                                <h3 className='m-0'>{team.session_outstanding_count}</h3>
                            </div>
                            <div className="d-flex flex-column my-4">
                                <p className="fs-5 m-0">Outstanding Payment</p>
                                <h3 className='m-0'>{team.outstanding_payment}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeamsDetail