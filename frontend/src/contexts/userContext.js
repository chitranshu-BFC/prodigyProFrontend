import React, { Component } from 'react'

const UserContext = React.createContext()

class UserProvider extends Component {
    // Context state
    state = {
        snapshot: [],
        portfolioData: [],
        taxPlanningLumpSum: [],
        userProfile: []
    }

    // Methods to update state
    setSnapshot = (snapshot) => {
        this.setState({ snapshot: [snapshot] })
    }

    setPortfolioData = (portfolioData) => {
        this.setState({ portfolioData: [portfolioData] })
    }

    setTaxPlanningLumpSum = (taxPlanningLumpSum) => {
        this.setState({ taxPlanningLumpSum: [...this.state.taxPlanningLumpSum, taxPlanningLumpSum] })
    }

    setUserProfile = (userProfileData) => {
        this.setState({ userProfile: [...userProfileData] })
    }

    render() {
        const { children } = this.props
        const { snapshot, portfolioData, taxPlanningLumpSum, userProfile } = this.state
        const { setSnapshot, setPortfolioData, setTaxPlanningLumpSum, setUserProfile } = this

        return (
            <UserContext.Provider
                value={{
                    snapshot,
                    userProfile,
                    portfolioData,
                    setSnapshot,
                    setPortfolioData,
                    taxPlanningLumpSum,
                    setTaxPlanningLumpSum,
                    setUserProfile
                }}
            >
                {children}
            </UserContext.Provider>
        )
    }
}

export default UserContext

export { UserProvider }