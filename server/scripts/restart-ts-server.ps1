# Stop any running TypeScript server
Get-Process -Name "node" -ErrorAction SilentlyContinue | 
  Where-Object { $_.CommandLine -like "*tsserver*" } | 
  Stop-Process -Force

# Give it a moment to fully stop
Start-Sleep -Seconds 1

# The TypeScript server will be automatically restarted by your IDE
Write-Host "TypeScript server has been restarted. Please wait a moment for the server to initialize."
