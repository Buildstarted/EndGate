﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EndGate.Core.Assets;
using EndGate.Core.BoundingObject;
using Xunit;

namespace EndGate.Core.Tests
{
    public class BoundingRectangleFacts
    {
        [Fact]
        public void UnrotatedRectangleCornersGetWorks()
        {
            var rect = new BoundingRectangle(6, 6)
            {
                Position = new Vector2d(3, 3)
            };

            Assert.True(rect.TopLeft.Equivalent(Vector2d.Zero));
            Assert.True(rect.TopRight.Equivalent(new Vector2d(6, 0)));
            Assert.True(rect.BotLeft.Equivalent(new Vector2d(0, 6)));
            Assert.True(rect.BotRight.Equivalent(new Vector2d(6, 6)));

            rect.Position -= 6;
            Assert.True(rect.TopLeft.Equivalent(new Vector2d(-6, -6)));
            Assert.True(rect.TopRight.Equivalent(new Vector2d(0, -6)));
            Assert.True(rect.BotLeft.Equivalent(new Vector2d(-6, 0)));
            Assert.True(rect.BotRight.Equivalent(Vector2d.Zero));
        }

        [Fact]
        public void RotatedRectangleCornersGetWorks()
        {
            var rect = new BoundingRectangle(4, 2)
            {
                Position = new Vector2d(3, 2),
                Rotation = Math.PI / 2
            };

            var topLeft = rect.TopLeft.Clone();
            var topRight = rect.TopRight.Clone();
            var botLeft = rect.BotLeft.Clone();
            var botRight = rect.BotRight.Clone();

            topLeft.Apply(Math.Round);
            topRight.Apply(Math.Round);
            botLeft.Apply(Math.Round);
            botRight.Apply(Math.Round);

            Assert.True(topLeft.Equivalent(new Vector2d(2, 4)));
            Assert.True(topRight.Equivalent(new Vector2d(2, 0)));
            Assert.True(botLeft.Equivalent(new Vector2d(4, 4)));
            Assert.True(botRight.Equivalent(new Vector2d(4, 0)));
        }

        [Fact]
        public void RectangleCornersSetWorks()
        {
            var rect = new BoundingRectangle(6, 6);

            rect.TopLeft = Vector2d.Zero;

            Assert.True(rect.TopLeft.Equivalent(Vector2d.Zero));
            Assert.True(rect.TopRight.Equivalent(new Vector2d(6, 0)));
            Assert.True(rect.BotLeft.Equivalent(new Vector2d(0, 6)));
            Assert.True(rect.BotRight.Equivalent(new Vector2d(6, 6)));

            rect.TopRight = Vector2d.Zero;
            Assert.True(rect.TopLeft.Equivalent(new Vector2d(-6, 0)));
            Assert.True(rect.TopRight.Equivalent(Vector2d.Zero));
            Assert.True(rect.BotLeft.Equivalent(new Vector2d(-6, 6)));
            Assert.True(rect.BotRight.Equivalent(new Vector2d(0, 6)));

            rect.BotLeft = Vector2d.Zero;
            Assert.True(rect.TopLeft.Equivalent(new Vector2d(0, -6)));
            Assert.True(rect.TopRight.Equivalent(new Vector2d(6, -6)));
            Assert.True(rect.BotLeft.Equivalent(Vector2d.Zero));
            Assert.True(rect.BotRight.Equivalent(new Vector2d(6, 0)));

            rect.BotRight = Vector2d.Zero;
            Assert.True(rect.TopLeft.Equivalent(new Vector2d(-6, -6)));
            Assert.True(rect.TopRight.Equivalent(new Vector2d(0, -6)));
            Assert.True(rect.BotLeft.Equivalent(new Vector2d(-6, 0)));
            Assert.True(rect.BotRight.Equivalent(Vector2d.Zero));
        }

        [Fact]
        public void UnRotatedRectanglesCollideCorrectly()
        {
            var rect1 = new BoundingRectangle(10, 6)
            {
                Position = new Vector2d(5, 3)
            };
            var rect2 = new BoundingRectangle(3, 3)
            {
                Position = new Vector2d(5, 3)
            };

            Assert.True(rect1.IsCollidingWith(rect2));
            Assert.True(rect2.IsCollidingWith(rect1));

            rect2.Position += 3;
            Assert.True(rect1.IsCollidingWith(rect2));
            Assert.True(rect2.IsCollidingWith(rect1));

            rect2.Position++;
            Assert.True(rect1.IsCollidingWith(rect2));
            Assert.True(rect2.IsCollidingWith(rect1));

            rect2.Position++;
            Assert.False(rect1.IsCollidingWith(rect2));
            Assert.False(rect2.IsCollidingWith(rect1));
        }

        [Fact]
        public void RotatedRectanglesCollideCorrectly()
        {
            var rect1 = new BoundingRectangle(4.24, 2.83)
            {
                Position = new Vector2d(2.5, 2.5),
                Rotation = - Math.PI / 4
            };
            var rect2 = new BoundingRectangle(6, 4)
            {
                Position = new Vector2d(9, 4)
            };

            Assert.False(rect1.IsCollidingWith(rect2));
            Assert.False(rect2.IsCollidingWith(rect1));

            rect2.Position.X-=2;

            Assert.True(rect1.IsCollidingWith(rect2));
            Assert.True(rect2.IsCollidingWith(rect1));

            rect2.Rotation = Math.PI / 2;

            Assert.False(rect1.IsCollidingWith(rect2));
            Assert.False(rect2.IsCollidingWith(rect1));
        }
    }
}