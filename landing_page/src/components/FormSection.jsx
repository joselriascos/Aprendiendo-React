import EYERIDE_LOGO from '../assets/EYERIDE_LOGO.png'
import IMAGE_2025 from '../assets/2025.png'
import DEVICES_GIF from '../assets/DEVICES.gif'
import './styles/FirstSection.css'
import { ScrollAnimatedImage } from './ScrollAnimatedImage'
import { InputForm } from './InputForm'
import { RadioOrCheckOptions } from './RadioOrCheckOptions'

const FLEET_SIZE_OPTIONS = [
  { id: 'first-section-option-1', text: '1-25', value: '1-25' },
  { id: 'first-section-option-2', text: '25-100', value: '25-100' },
  { id: 'first-section-option-3', text: '100 and up', value: '100 and up' },
  { id: 'first-section-option-4', text: 'Other', value: 'Other' },
]

export function FormSection() {
  return (
    <section id="first-section">
      <img id="first-section-logo" src={EYERIDE_LOGO} alt="Logo" />

      <ScrollAnimatedImage
        id="image-2025"
        src={IMAGE_2025}
        alt="2025"
        classIfVisible="load-2025-animation"
        classIfNotVisible=""
      />

      <h1 id="first-section-title">
        Smarter Fleets, Brighter Future: Welcome 2025 with EYERIDE!
      </h1>

      <img id="first-section-devices-gif" src={DEVICES_GIF} alt="Devices" />

      <p>
        Get Your <strong>FREE</strong> Custom Quote!
      </p>

      <form id="first-section-form">
        <InputForm
          text="Company Name:"
          type="text"
          id="first-section-company-input"
        />

        <InputForm
          text="Name:*"
          type="text"
          id="first-section-name-input"
          required={true}
        />

        <InputForm
          text="Direct Phone Number:*"
          type="number"
          id="first-section-phone-input"
          required={true}
        />

        <InputForm
          text="Email:*"
          type="email"
          id="first-section-email-input"
          required={true}
        />

        <label form="first-section-form">Fleet size:*</label>

        <RadioOrCheckOptions 
          options={FLEET_SIZE_OPTIONS} 
          name="fleet-size" 
          required={true}
          type="radio"
        />

        <input type="submit" value="Get My FREE Custom Quote!" />
      </form>
    </section>
  )
}
