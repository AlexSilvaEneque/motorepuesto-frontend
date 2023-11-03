import dashboardAPI from "@/api/dashboardAPI"

export default function useDashboard() {

    const allInformationCards = async () => {
        const { data } = await dashboardAPI.allInformation()
        return data
    }

    return {
        allInformationCards
    }
}