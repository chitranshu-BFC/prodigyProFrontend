import React, { Component } from 'react'

const UserContext = React.createContext()

class UserProvider extends Component {
    // Context state
    state = {
        snapshot: [],
        portfolioData: [],
        taxPlanningLumpSum: [],
        userProfile: [],
        amcListTransactPage: []
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

    setAmcListTransactPage = (amcListTransactPage) => {
        this.setState({ amcListTransactPage: [...amcListTransactPage] })
    }

    render() {
        const { children } = this.props
        const { snapshot, portfolioData, taxPlanningLumpSum, userProfile, amcListTransactPage } = this.state
        const { setSnapshot, setPortfolioData, setTaxPlanningLumpSum, setUserProfile, setAmcListTransactPage } = this

        console.log("userProfile ", userProfile)

        return (
            <UserContext.Provider
                value={{
                    snapshot,
                    userProfile,
                    portfolioData,
                    amcListTransactPage,
                    setSnapshot,
                    setPortfolioData,
                    taxPlanningLumpSum,
                    setTaxPlanningLumpSum,
                    setUserProfile,
                    setAmcListTransactPage
                }}
            >
                {children}
            </UserContext.Provider>
        )
    }
}

export default UserContext

export { UserProvider }