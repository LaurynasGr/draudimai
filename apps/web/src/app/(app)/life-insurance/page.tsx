import { redirect } from 'next/navigation'
import { INSURERS } from './insurers'

/** The section has no page of its own: the selected insurer lives in the URL, starting with the first one. */
export default function LifeInsurancePage() {
    redirect(`/life-insurance/${INSURERS[0].id}`)
}
