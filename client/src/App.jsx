import { Navbar, Welcome, Footer, Loader, Services, Transaction } from './components/index';

export default function App() {
  return (
    <div className="min-h-screen">
      <div className='gradient-bg-welcome'>
        <Navbar/>
        <Welcome/>
      </div>
      <Services/>
      <Transaction/>
      <Footer/>
    </div>
  )
}

