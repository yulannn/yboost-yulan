# Script PowerShell pour gérer les conteneurs Docker Yboost

param(
    [Parameter(Position=0)]
    [ValidateSet('start', 'stop', 'restart', 'build', 'logs', 'clean', 'status')]
    [string]$Action = 'start'
)

$ErrorActionPreference = "Stop"

Write-Host "🐳 Yboost Docker Manager" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan
Write-Host ""

switch ($Action) {
    'start' {
        Write-Host "▶️  Démarrage des services..." -ForegroundColor Green
        docker-compose up -d
        Write-Host "✅ Services démarrés !" -ForegroundColor Green
        Write-Host ""
        Write-Host "🌐 Services disponibles :" -ForegroundColor Yellow
        Write-Host "  - Backend API: http://localhost:3000" -ForegroundColor White
        Write-Host "  - pgAdmin: http://localhost:5051" -ForegroundColor White
        Write-Host "  - PostgreSQL: localhost:5434" -ForegroundColor White
    }
    
    'stop' {
        Write-Host "⏹️  Arrêt des services..." -ForegroundColor Yellow
        docker-compose down
        Write-Host "✅ Services arrêtés !" -ForegroundColor Green
    }
    
    'restart' {
        Write-Host "🔄 Redémarrage des services..." -ForegroundColor Yellow
        docker-compose restart
        Write-Host "✅ Services redémarrés !" -ForegroundColor Green
    }
    
    'build' {
        Write-Host "🔨 Reconstruction des images..." -ForegroundColor Magenta
        docker-compose build --no-cache
        Write-Host "✅ Images reconstruites !" -ForegroundColor Green
        Write-Host ""
        Write-Host "💡 Utilisez './docker.ps1 start' pour démarrer les services" -ForegroundColor Yellow
    }
    
    'logs' {
        Write-Host "📋 Affichage des logs..." -ForegroundColor Cyan
        docker-compose logs -f
    }
    
    'clean' {
        Write-Host "⚠️  ATTENTION : Ceci va supprimer tous les conteneurs, volumes et données !" -ForegroundColor Red
        $confirmation = Read-Host "Êtes-vous sûr ? (oui/non)"
        if ($confirmation -eq 'oui') {
            Write-Host "🧹 Nettoyage complet..." -ForegroundColor Red
            docker-compose down -v
            docker system prune -f
            Write-Host "✅ Nettoyage terminé !" -ForegroundColor Green
        } else {
            Write-Host "❌ Opération annulée" -ForegroundColor Yellow
        }
    }
    
    'status' {
        Write-Host "📊 Statut des services :" -ForegroundColor Cyan
        Write-Host ""
        docker-compose ps
    }
}
