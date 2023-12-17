import Image from 'next/image'
import styles from './page.module.css'
import InputTextArea from './components/InputTextArea'
import TopBar from './components/TopBar'
import RecipeOutput from './components/RecipeOutput'
import FetchIngredients from './components/FetchIngredients'

const placeHolderSuggestion = 'Carrots, Bacon, Eggs, Cheese...';


export default function Home() {
  return (
    <main className={styles.main}>

      <h1>ChefGPT 0.1</h1>
      <div className={styles.layout}>
        <TopBar
          userName='Hoccyy'
        />

        <RecipeOutput/>

        <div>
          <InputTextArea
            placeHolder={placeHolderSuggestion}
          />
        </div>
      </div>

    </main>
  )
}
