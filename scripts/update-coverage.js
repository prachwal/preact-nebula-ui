#!/usr/bin/env node

/**
 * Skrypt do automatycznego generowania i kopiowania danych pokrycia testów
 * Uruchamiane podczas procesu budowania aplikacji
 */

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const COVERAGE_FILE = path.join(__dirname, '..', 'coverage', 'coverage-final.json')
const PUBLIC_COVERAGE_FILE = path.join(__dirname, '..', 'public', 'coverage-final.json')

async function generateCoverage() {
  console.log('🔄 Generowanie pokrycia testów...')
  
  try {
    // Uruchom testy z pokryciem
    execSync('npm run test:coverage', { 
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    })
    
    console.log('✅ Testy wykonane pomyślnie')
  } catch (error) {
    console.warn('⚠️  Błąd podczas wykonywania testów:', error.message)
    console.log('📝 Używanie mock danych...')
    return false
  }
  
  // Sprawdź czy plik pokrycia został wygenerowany
  if (!fs.existsSync(COVERAGE_FILE)) {
    console.warn('⚠️  Nie znaleziono pliku pokrycia')
    return false
  }
  
  // Utwórz katalog public jeśli nie istnieje
  const publicDir = path.dirname(PUBLIC_COVERAGE_FILE)
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }
  
  // Skopiuj plik pokrycia do katalogu public
  try {
    fs.copyFileSync(COVERAGE_FILE, PUBLIC_COVERAGE_FILE)
    console.log('📋 Skopiowano dane pokrycia do public/')
    return true
  } catch (error) {
    console.error('❌ Błąd podczas kopiowania pliku pokrycia:', error.message)
    return false
  }
}

async function main() {
  console.log('🚀 Rozpoczynanie procesu aktualizacji pokrycia testów...')
  
  const success = await generateCoverage()
  
  if (success) {
    console.log('🎉 Proces zakończony pomyślnie!')
  } else {
    console.log('💡 Aplikacja będzie używać mock danych pokrycia')
  }
}

// Uruchom tylko jeśli wywołane bezpośrednio
main().catch(console.error)
