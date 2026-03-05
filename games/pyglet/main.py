import pyglet
window = pyglet.window.Window()

label = pyglet.text.Label('Hello, world',
                          font_name='Times New Roman',
                          font_size=36,
                          x=window.width//2, y=window.height//2,
                          anchor_x='center', anchor_y='center')

@window.event
def on_key_press(symbol, modifiers):
    print('A key was pressed')
    print(symbol)

@window.event
def on_mouse_press(x, y, button, modifiers):
    print("mouse pressed")
    print(button)
    if button == pyglet.window.mouse.LEFT:
        print('The left mouse button was pressed.')

@window.event
def on_click(symbol, modifiers):
    print('A key was pressed')
    print(symbol)


@window.event
def on_draw():
    window.clear()
    label.draw()


pyglet.app.run()