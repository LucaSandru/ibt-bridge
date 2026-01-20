# IBT Bridge Setup Script

# STEP 1: Start Sui (no persistence)
Start-Process powershell -ArgumentList "sui start --with-faucet" -NoNewWindow

# STEP 2: Start Anvil if not already running
if (-not (Get-Process -Name anvil -ErrorAction SilentlyContinue)) {
    Start-Process powershell -ArgumentList "anvil" -NoNewWindow
    Write-Host "✅ Anvil started"
} else {
    Write-Host "⚠️ Anvil already running"
}

# STEP 3: Deploy ETH contract
$PRIVATE_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
$DEPLOY_OUTPUT = forge script script/DeployIBTToken.s.sol:DeployIBT `
  --rpc-url http://127.0.0.1:8545 `
  --private-key $PRIVATE_KEY `
  --broadcast

Write-Host "=== Deploy Output ==="
Write-Host $DEPLOY_OUTPUT
Write-Host "====================="

# STEP 4: Extract contract address
if ($DEPLOY_OUTPUT -match "Contract Address: (\S+)") {
    $ethAddress = $matches[1]
    Write-Host "✅ ETH Contract deployed at $ethAddress"

    # STEP 5: Update .env
    $envPath = "D:\ibt-bridge\.env"
    (Get-Content $envPath) `
      -replace "ETH_CONTRACT_ADDRESS=.*", "ETH_CONTRACT_ADDRESS=$ethAddress" `
      | Set-Content $envPath
    Write-Host "✅ .env updated"
} else {
    Write-Host "❌ Failed to extract ETH contract address"
}
