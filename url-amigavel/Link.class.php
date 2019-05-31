<?php

/*
FAZ GESTÃO DE LINKS E URL AMIGAVEIS INCLUINDO NUMEROS DE PAGINAÇÃO, PASTAS, ARQUIVOS E LINKS
*/


class Link{

	public $Local;
	public $Path;
	public $File;
	public $Link;

	function __construct(){

		$this->Local = strip_tags(trim(filter_input(INPUT_GET, 'page', FILTER_DEFAULT)));
		$this->Local = ( $this->Local ? $this->Local: 'home');
		$this->Local = explode('/', $this->Local);
		$this->checkLink();

	}
	private function checkLink(){

		// VERIFICA SE O INDICE 1 NÃO É UM NUMERO DE PAGINAÇÃO
		if(!preg_match( '/^[0-9]*$/' , $this->Local[0] ) ){
			// VERIFICA SE O ULTIMO INDICE DO LOCAL É UM ARQUIVO PHP
			if(!file_exists(REQ . '/pages/' . end($this->Local) . '.php')){

				// VERIFICA SE O ARQUIVO PHP DO INDICE 0 NÃO EXISTE. 
				if(!file_exists(REQ . '/pages/' . $this->Local[0] . '.php')){
					// VERIFICA SE O INDICE 1 DO LOCAL FOI SETADO OU NÃO ESTA VAZIO
					if(isset($this->Local[1]) && !empty($this->Local[1]))
					{
						// VERIFICA SE O INDICE 1 NÃO É UM NUMERO DE PAGINAÇÃO
						if(!preg_match( '/^[0-9]*$/' , $this->Local[1] ) ){
							// VERIFICA SE O ARQUIVO PHP NO INDICE 1 EXISTE
							if(file_exists(REQ . '/pages/' . $this->Local[0] . '/' . $this->Local[1] . '.php')){
								$this->Path = $this->Local[0];
								$this->File = $this->Local[1];
								$this->Link = ( isset($this->Local[2]) ? $this->Local[2] : null);

							}else{
								// ENTRA AQUI SE O ARQUIVO PHP DO INDICE 1 NÃO EXISTIR
								$this->Path = null;
								$this->File = '404';
								$this->Link = ( isset($this->Local[2]) ? $this->Local[2] : null);
							}

						}else{

							// ENTRA AQUI SE O INDICE 1 FOR UM NUMERO DE PAGINAÇÃO

							// SE O ARQUIVO PHP DO INDICE [0] EXISTIR
							if(file_exists(REQ . '/pages/' . $this->Local[0] . '/home.php'))
							{
								$this->Path = $this->Local[0];
								$this->File = 'home';
								$this->Link = ( isset($this->Local[2]) ? $this->Local[2] : null);

							}else{
								$this->Path = null;
								$this->File = '404';
								$this->Link = null; 
							}

						}

					}else{


						// VERIFICA SE O ARQUIVO PHP DO INDICE [0] EXISTE. 
						if(file_exists(REQ . '/pages/' . $this->Local[0] .  '/home.php')){
							$this->Path = $this->Local[0];
							$this->File = 'home';
							$this->Link = ( isset($this->Local[2]) ? $this->Local[2] : null); 

						}else{

							// ENTRA AQUI SE O ARQUIVO NO INDICE [0] NÃO EXISTIR.
							$this->Path = null;
							$this->File = '404';
							$this->Link = null; 
						}
					}

				}else{
					// ENTRA AQUI SE O ARQUIVO DO INDICE [0] EXISTIR.
					$this->Path = null;
					$this->File = $this->Local[0];
					$this->Link = ( isset($this->Local[1]) ? $this->Local[1] : null);

				}

			} else { 
				// ENTRA AQUI SE O ARQUIVO DO ULTIMO INDICE EXISTIR
				$this->Path = null; $this->File  = end($this->Local); 
			}
			
		}else{
			// ENTRA AQUI SE O INDICE [0] FOR UM NUMERO DE PAGINAÇÃO

			$this->Path = null;

			if($this->Local[0] != '404'){
				$this->File = 'home';
				$this->Link = ( isset($this->Local[0]) ? $this->Local[0] : null);
			}else{
				$this->File = '404';
				$this->Link = null;
			}


		}


	}

}

?>