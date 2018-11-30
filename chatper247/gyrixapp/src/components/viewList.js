import React ,{ Component } from "react";
import * as action from "../actions/api";

class ViewList extends Component {

    state={
        searchText: 'mix',
        array: [],
    }

    componentDidMount() {
        this.search();
    }
    
    search = () => {
        // boxer
        // chow
        // mix
        // germanshepherd
        action.API(this.state.searchText) 
        .then((res)=>{
            console.log(res);
            this.setState({
                array: res.data.message
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    renderItems = () => {
       return this.state.array.map((item, index) => {
            console.log(item)

            return (<div class="col-sm-3 col-xs-6 image_wrapper_inner"><img key={index} src={item} alt={item}  className="img-responsive" /></div>);
        });
    }

    render() {
        return (
            <div>
                <div className="row mx-0">
                    <div className="col-12 search-barWrapper">
                        <input onChange={(event) => {this.setState({searchText: event.target.value})}} type="text"/>
                        <button onClick={() => this.search()}>search</button>
                    </div>    
                </div>
                <div className="images_wrapper row">
                    {this.state.array ? this.renderItems() : ""}
                </div>
            </div>
        );
    }

}

export default ViewList;